import type { ShikiTransformer } from "shiki";

const regex = /^showLineNumbers(?:=(\d{1,3}))?$/;

export function transformerLineNumbers(): ShikiTransformer {
  return {
    pre(hast) {
      const metaValues = this.options.meta?.__raw?.split(" ");
      if (!metaValues) {
        return;
      }

      let match = null;
      for (const value of metaValues) {
        match = value.match(regex);
        if (match) {
          break;
        }
      }

      if (!match) {
        return;
      }

      this.addClassToHast(hast, "show-line-numbers");
      const startingNumber = match[1] ? parseInt(match[1]) : null;

      if (startingNumber) {
        // Have to set -1 because step is incremented directly
        hast.properties.style += `;--starting-line-number: ${startingNumber - 1};`;
      }
    },
  };
}
