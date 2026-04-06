import { describe, it, expect } from "vitest";
import { codeToHast } from "shiki";
import { transformerMetaWordHighlight } from "./transformerMetaWordHighlight";
import type { Element } from "hast";

// Helper function to extract text content from a HAST node
function extractText(node: Element | { type: string; value?: string }): string {
  if (node.type === "text" && "value" in node) {
    return node.value || "";
  }
  if (node.type === "element" && "children" in node) {
    return (node.children || []).map((child) => extractText(child as Element)).join("");
  }
  return "";
}

// Helper function to count highlighted words in a HAST tree
function countHighlightedWords(
  node: Element,
  word: string,
): number {
  let count = 0;

  if (!node.children) return 0;

  for (const child of node.children) {
    if (child.type === "element") {
      // Check if this is a highlight span
      if (
        child.tagName === "span" &&
        child.properties?.class === "word-highlight"
      ) {
        const text = extractText(child);
        if (text === word) {
          count++;
        }
      }
      // Recursively check children
      count += countHighlightedWords(child as Element, word);
    }
  }

  return count;
}

// Helper function to get positions of highlighted words
function getHighlightedPositions(
  node: Element,
  word: string,
): Array<number> {
  const positions: Array<number> = [];
  let wordIndex = 0;

  function traverse(n: Element) {
    if (!n.children) return;

    for (const child of n.children) {
      if (child.type === "text" && "value" in child) {
        const text = child.value || "";
        const regex = new RegExp(`\\b${word}\\b`, "g");
        while (regex.exec(text) !== null) {
          wordIndex++;
        }
      } else if (child.type === "element") {
        if (
          child.tagName === "span" &&
          child.properties?.class === "word-highlight"
        ) {
          const text = extractText(child);
          if (text === word) {
            wordIndex++;
            positions.push(wordIndex);
          }
        } else {
          traverse(child as Element);
        }
      }
    }
  }

  traverse(node);
  return positions;
}

describe("transformerMetaWordHighlight", () => {
  it("should highlight a single word in code", async () => {
    const code = `const foo = 1;
console.log(foo);`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const highlightedCount = countHighlightedWords(root, "foo");
    expect(highlightedCount).toBe(2);
  });

  it("should highlight multiple different words", async () => {
    const code = `const foo = 1;
const bar = 2;
console.log(foo, bar);`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo,bar"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const fooCount = countHighlightedWords(root, "foo");
    const barCount = countHighlightedWords(root, "bar");
    expect(fooCount).toBe(2);
    expect(barCount).toBe(2);
  });

  it("should highlight only specific instances of a word", async () => {
    const code = `const foo = 1;
const bar = foo;
const baz = foo;
console.log(foo);`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo:1+3"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const positions = getHighlightedPositions(root, "foo");
    expect(positions).toEqual([1, 3]);
  });

  it("should handle mixed word and instance specifications", async () => {
    const code = `const foo = 1;
const bar = foo;
const baz = foo;
console.log(bar, foo);`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo:1,bar"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const fooPositions = getHighlightedPositions(root, "foo");
    const barCount = countHighlightedWords(root, "bar");
    expect(fooPositions).toEqual([1]);
    expect(barCount).toBe(2);
  });

  it("should not highlight when word is not in meta", async () => {
    const code = `const foo = 1;`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: "",
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const highlightedCount = countHighlightedWords(root, "foo");
    expect(highlightedCount).toBe(0);
  });

  it("should handle empty word configuration", async () => {
    const code = `const foo = 1;`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word=""',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const highlightedCount = countHighlightedWords(root, "foo");
    expect(highlightedCount).toBe(0);
  });

  it("should use custom class name when provided", async () => {
    const code = `const foo = 1;`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo"',
      },
      transformers: [
        transformerMetaWordHighlight({ highlightClassName: "custom-highlight" }),
      ],
    });

    const root = hast as Element;

    function hasCustomClass(node: Element): boolean {
      if (!node.children) return false;

      for (const child of node.children) {
        if (child.type === "element") {
          if (
            child.tagName === "span" &&
            child.properties?.class === "custom-highlight"
          ) {
            return true;
          }
          if (hasCustomClass(child as Element)) {
            return true;
          }
        }
      }
      return false;
    }

    expect(hasCustomClass(root)).toBe(true);
  });

  it("should only match whole words, not partial matches", async () => {
    const code = `const foobar = 1;
const foo = 2;`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const highlightedCount = countHighlightedWords(root, "foo");
    // Should only match "foo" on line 2, not "foo" in "foobar"
    expect(highlightedCount).toBe(1);
  });

  it("should handle multiple instances in the same line", async () => {
    const code = `console.log(foo, foo, foo);`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="foo:1+3"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const positions = getHighlightedPositions(root, "foo");
    expect(positions).toEqual([1, 3]);
  });

  it("should handle word with special regex characters", async () => {
    const code = `const $var = 1;
console.log($var);`;

    const hast = await codeToHast(code, {
      lang: "javascript",
      theme: "dark-plus",
      meta: {
        __raw: 'word="$var"',
      },
      transformers: [transformerMetaWordHighlight()],
    });

    const root = hast as Element;
    const highlightedCount = countHighlightedWords(root, "$var");
    expect(highlightedCount).toBe(2);
  });
});
