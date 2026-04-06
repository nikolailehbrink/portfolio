import type { ShikiTransformer } from "shiki";
import type { Element } from "hast";

type TransformerMetaWordHighlightOptions = {
  /**
   * Class for highlighted words
   * @default 'word-highlight'
   */
  highlightClassName?: string;
};

/**
 * Parse word configuration from a string like "foo" or "foo,bar" or "foo:1+3"
 * Returns a map of words to their instance numbers (1-indexed), or null for all instances
 * 
 * Examples:
 * - "foo" -> highlight all instances of "foo"
 * - "foo,bar" -> highlight all instances of "foo" and "bar"
 * - "foo:1+3" -> highlight 1st and 3rd instances of "foo"
 * - "foo:1+3,bar" -> highlight 1st and 3rd instances of "foo", all instances of "bar"
 */
function parseWordConfig(wordConfigStr: string): Map<string, Array<number> | null> {
  if (!wordConfigStr) return new Map();

  const result = new Map<string, Array<number> | null>();

  // Split by commas to get individual word configurations
  const wordConfigs = wordConfigStr.split(",");

  for (const config of wordConfigs) {
    const trimmedConfig = config.trim();
    if (!trimmedConfig) continue;

    // Check if it has instance specification (e.g., "foo:1+3")
    if (trimmedConfig.includes(":")) {
      const [word, instancesStr] = trimmedConfig.split(":");
      const trimmedWord = word.trim();

      if (!trimmedWord) continue;

      // Parse instance numbers - split by + instead of comma
      const instances = instancesStr
        .split("+")
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0); // Only positive numbers

      if (instances.length > 0) {
        // Merge with existing instances if word already exists
        const existing = result.get(trimmedWord);
        if (existing === null) {
          // If already set to highlight all, keep it that way
          continue;
        }
        const merged = existing ? [...existing, ...instances] : instances;
        // Remove duplicates and sort
        result.set(
          trimmedWord,
          [...new Set(merged)].sort((a, b) => a - b),
        );
      }
    } else {
      // No instance specification, highlight all instances
      result.set(trimmedConfig, null);
    }
  }

  return result;
}

/**
 * Check if a character can be a word boundary
 */
function isWordBoundary(char: string | undefined): boolean {
  if (!char) return true;
  return !/[a-zA-Z0-9_]/.test(char);
}

/**
 * Find all instances of words in text and return their positions
 */
function findWordInstances(
  text: string,
  words: Array<string>,
): Map<string, Array<number>> {
  const instances = new Map<string, Array<number>>();

  for (const word of words) {
    const positions: Array<number> = [];
    const pattern = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${pattern})`, "g");

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const matchStart = match.index;
      const matchEnd = matchStart + word.length;

      // Check word boundaries manually
      const beforeChar = matchStart > 0 ? text[matchStart - 1] : undefined;
      const afterChar = matchEnd < text.length ? text[matchEnd] : undefined;

      // Skip if not a whole word match
      if (!isWordBoundary(beforeChar) || !isWordBoundary(afterChar)) {
        continue;
      }

      positions.push(matchStart);
    }

    if (positions.length > 0) {
      instances.set(word, positions);
    }
  }

  return instances;
}

/**
 * Process a line and wrap matching word instances in spans
 */
function processLine(
  line: Element,
  wordConfig: Map<string, Array<number> | null>,
  className: string,
  instanceCounters: Map<string, number>,
): void {
  if (!line.children) return;

  // First, collect all text from the line to find word positions
  let lineText = "";
  function collectText(node: Element | { type: string; value?: string }): void {
    if (node.type === "text" && "value" in node) {
      lineText += node.value || "";
    } else if (node.type === "element" && "children" in node) {
      for (const child of node.children || []) {
        collectText(child as Element);
      }
    }
  }
  collectText(line);

  // Find all word instances in the line text
  const wordsToHighlight = Array.from(wordConfig.keys());
  const wordInstances = findWordInstances(lineText, wordsToHighlight);

  // Create a map of absolute positions to highlight
  const positionsToHighlight = new Map<number, string>(); // position -> word
  for (const [word, positions] of wordInstances.entries()) {
    const instanceConfig = wordConfig.get(word);

    for (let i = 0; i < positions.length; i++) {
      const instanceNumber = (instanceCounters.get(word) || 0) + i + 1;

      const shouldHighlight =
        instanceConfig === null || instanceConfig.includes(instanceNumber);

      if (shouldHighlight) {
        positionsToHighlight.set(positions[i], word);
      }
    }

    // Update the global instance counter
    const currentCount = instanceCounters.get(word) || 0;
    instanceCounters.set(word, currentCount + positions.length);
  }

  // Now traverse the tree and apply highlights based on positions
  let currentPosition = 0;

  function highlightInNode(node: Element): number {
    if (!node.children) return currentPosition;

    const newChildren: Array<Element | { type: "text"; value: string }> = [];

    for (const child of node.children) {
      if (child.type === "text" && "value" in child) {
        const text = child.value || "";
        const textStart = currentPosition;
        const textEnd = currentPosition + text.length;

        // Find highlights that overlap with this text node
        const relevantHighlights: Array<{ pos: number; word: string }> = [];
        for (const [pos, word] of positionsToHighlight.entries()) {
          if (pos >= textStart && pos < textEnd) {
            relevantHighlights.push({ pos, word });
          }
        }

        if (relevantHighlights.length === 0) {
          // No highlights in this text node
          newChildren.push(child);
        } else {
          // Split text and add highlights
          relevantHighlights.sort((a, b) => a.pos - b.pos);

          let lastIndex = 0;
          for (const { pos, word } of relevantHighlights) {
            const relativePos = pos - textStart;
            const wordEnd = relativePos + word.length;

            // Add text before the word
            if (relativePos > lastIndex) {
              newChildren.push({
                type: "text",
                value: text.substring(lastIndex, relativePos),
              });
            }

            // Add the highlighted word
            newChildren.push({
              type: "element",
              tagName: "span",
              properties: {
                class: className,
              },
              children: [
                {
                  type: "text",
                  value: word,
                },
              ],
            });

            lastIndex = wordEnd;
          }

          // Add remaining text
          if (lastIndex < text.length) {
            newChildren.push({
              type: "text",
              value: text.substring(lastIndex),
            });
          }
        }

        currentPosition = textEnd;
      } else if (child.type === "element") {
        // Recursively process element children
        currentPosition = highlightInNode(child as Element);
        newChildren.push(child);
      } else {
        newChildren.push(child);
      }
    }

    node.children = newChildren;
    return currentPosition;
  }

  highlightInNode(line);
}

/**
 * Allow using `word="foo"` or `word="foo,bar"` or `word="foo:1+3"` in the code snippet meta to highlight specific words.
 *
 * Examples:
 * ```js word="console"
 * console.log("Hello"); // "console" will be highlighted
 * ```
 *
 * ```js word="foo,bar"
 * const foo = 1; // "foo" will be highlighted
 * const bar = 2; // "bar" will be highlighted
 * ```
 *
 * ```js word="foo:1+3"
 * const foo = 1; // This "foo" (1st instance) will be highlighted
 * const bar = foo; // This "foo" (2nd instance) will NOT be highlighted
 * const baz = foo; // This "foo" (3rd instance) will be highlighted
 * ```
 *
 * ```js word="foo:1,bar"
 * const foo = 1; // This "foo" (1st instance) will be highlighted
 * const bar = foo; // "bar" will be highlighted, "foo" (2nd instance) will NOT
 * ```
 */
export function transformerMetaWordHighlight(
  options: TransformerMetaWordHighlightOptions = {},
): ShikiTransformer {
  const { highlightClassName = "word-highlight" } = options;

  return {
    name: "transformerMetaWordHighlight",
    code(node) {
      const meta = this.options.meta?.__raw;
      if (!meta) return;

      // Match word="..." or word='...'
      const wordMatch = meta.match(/word=["']([^"']+)["']/);
      if (!wordMatch) return;

      const wordConfig = parseWordConfig(wordMatch[1]);
      if (wordConfig.size === 0) return;

      // Instance counters to track which instance of each word we're on
      const instanceCounters = new Map<string, number>();

      // Process each line
      const lines = node.children.filter((node) => node.type === "element");

      for (const line of lines) {
        processLine(
          line as Element,
          wordConfig,
          highlightClassName,
          instanceCounters,
        );
      }
    },
  };
}
