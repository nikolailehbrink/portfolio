import type { ShikiTransformer } from "shiki";

const CLASSES = {
  add: "diff add",
  remove: "diff remove",
  hasDiff: "has-diff",
  highlight: "highlight",
};

/**
 * Parse line numbers from a string like "1,3,4-5,7-9"
 * Returns an array of line numbers (1-indexed)
 */
function parseLineNumbers(lineNumbersStr: string): Array<number> {
  if (!lineNumbersStr) {
    return [];
  }

  const result: Array<number> = [];

  // Split by commas
  const parts = lineNumbersStr.split(",");

  for (const part of parts) {
    const trimmedPart = part.trim();

    // Check if it's a range (e.g., "4-5")
    if (trimmedPart.includes("-")) {
      const [start, end] = trimmedPart
        .split("-")
        .map((n) => parseInt(n.trim(), 10));

      // Validate range
      if (isNaN(start) || isNaN(end)) {
        continue;
      }

      // Add all numbers in the range
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
    }
    // Single line number
    else {
      const num = parseInt(trimmedPart, 10);
      if (!isNaN(num)) {
        result.push(num);
      }
    }
  }

  return result;
}

type TransformerMetaLineDiffOptions = {
  /**
   * Class for added lines
   * @default 'diff-add'
   */
  addClassName?: string;

  /**
   * Class for removed lines
   * @default 'diff-remove'
   */
  removeClassName?: string;

  /**
   * Class for the pre element when diff is present
   * @default 'has-diff'
   */
  hasDiffClassName?: string;
};

/**
 * Allow using `add={1,3,4-5} remove={9-11`} in the code snippet meta to mark added and removed lines.
 *
 * Example:
 * ```js add={1,3,4-5} remove={9-11}
 * // Code here
 * ```
 */
function transformerMetaDiff(
  options: TransformerMetaLineDiffOptions = {},
): ShikiTransformer {
  const {
    addClassName = CLASSES.add,
    removeClassName = CLASSES.remove,
    hasDiffClassName = CLASSES.hasDiff,
  } = options;

  return {
    name: "transformerMetaDiff",
    code(node) {
      const meta = this.options.meta?.__raw;
      if (!meta) {
        return;
      }

      const addMatch = meta.match(/add=\{(\S+)\}/);
      const removeMatch = meta.match(/remove=\{(\S+)\}/);

      if (!addMatch && !removeMatch) {
        return;
      }

      this.addClassToHast(this.pre, hasDiffClassName);

      const addLines = addMatch ? parseLineNumbers(addMatch[1]) : [];
      const removeLines = removeMatch ? parseLineNumbers(removeMatch[1]) : [];

      const lines = node.children.filter((node) => node.type === "element");

      lines.forEach((line, index) => {
        // Line numbers are 1-indexed in the parameters
        const lineNumber = index + 1;

        if (addLines.includes(lineNumber)) {
          this.addClassToHast(line, addClassName);
        }

        if (removeLines.includes(lineNumber)) {
          this.addClassToHast(line, removeClassName);
        }
      });
    },
  };
}

type TransformerMetaHighlightOptions = {
  /**
   * Class for highlighted lines
   * @default 'highlighted'
   */
  highlightClassName?: string;
};

/**
 * Allow using `highlight={1,3,4-5}` in the code snippet meta to mark highlighted lines.
 *
 * Example:
 * ```js highlight={1,3,4-5}
 * // Code here
 * ```
 *
 * You can also use multiple highlight ranges:
 * ```js highlight={1-3,5,7-9}
 * // Code here
 * ```
 */
function transformerMetaHighlight(
  options: TransformerMetaHighlightOptions = {},
): ShikiTransformer {
  const { highlightClassName = CLASSES.highlight } = options;

  return {
    name: "transformerMetaHighlight",
    code(node) {
      const meta = this.options.meta?.__raw;
      if (!meta) {
        return;
      }

      const highlightMatch = meta.match(/highlight=\{([^}]+)\}/);
      if (!highlightMatch) {
        return;
      }

      const highlightLines = parseLineNumbers(highlightMatch[1]);
      const lines = node.children.filter((node) => node.type === "element");

      lines.forEach((line, index) => {
        // Line numbers are 1-indexed in the parameters
        const lineNumber = index + 1;

        if (highlightLines.includes(lineNumber)) {
          this.addClassToHast(line, highlightClassName);
        }
      });
    },
  };
}

export { transformerMetaDiff, transformerMetaHighlight };
