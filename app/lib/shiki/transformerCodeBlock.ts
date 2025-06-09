import type { ShikiTransformer } from "shiki";

/**
 * A Shiki transformer that processes metadata for code blocks including:
 * - Filename display
 * - Copy button visibility
 * - Line numbers display
 *
 * Usage examples:
 * ````
 * ```js filename="example.js"
 * console.log('Hello world')
 * ```
 * ````
 *
 * ````
 * ```js noCopy showLineNumbers
 * console.log('Hello world')
 * ```
 * ````
 */
export function transformerCodeBlock(): ShikiTransformer {
  return {
    name: "transformer-code-block",
    preprocess(code) {
      // Initialize metadata object with code and language
      const metaData: Record<string, string> = {
        "data-code": code,
        "data-language": this.options.lang,
      };

      // Process raw metadata if available
      const rawMeta = this.options.meta?.__raw;
      if (rawMeta) {
        const metaPairs = rawMeta.split(" ");

        // Handle noCopy flag
        if (metaPairs.includes("noCopy")) {
          metaData["data-no-copy"] = "true";
        }

        // Extract filename using regex
        const filenameMatch = rawMeta.match(/filename="([^"]+)"/);
        if (filenameMatch && filenameMatch[1]) {
          metaData["data-filename"] = filenameMatch[1];
        }
      }

      // Update options.meta with all collected metadata
      // Key values in options.meta will be serialized to the attributes of the root <pre> element
      this.options.meta = {
        ...this.options.meta,
        ...metaData,
      };
    },
    pre(hast) {
      // Handle line numbers display, has to be done in the pre step,
      // because preprocess only returns the code and not the hast
      const showLineNumbers =
        this.options.meta?.__raw?.includes("showLineNumbers");

      if (!showLineNumbers) {
        return;
      }
      this.addClassToHast(hast, "show-line-numbers");
      const startingNumberMatch = this.options.meta?.__raw?.match(
        /showLineNumbers=(\d+)/,
      );
      const startingNumber =
        startingNumberMatch && parseInt(startingNumberMatch[1], 10);

      if (startingNumber) {
        hast.properties.style = `--starting-line-number: ${startingNumber};`;
      }
      return;
    },
  };
}
