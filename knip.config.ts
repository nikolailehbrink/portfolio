import type { KnipConfig } from "knip";

export default {
  compilers: {
    css: (text: string) => {
      // https://github.com/webpro-nl/knip/issues/1008#issuecomment-2756572278
      text = text.replace("@plugin", "@import");
      return [...text.matchAll(/(?<=@)import[^;]+/g)].join("\n");
    },
  },
  ignoreBinaries: ["dotenv"],
  // https://github.com/webpro-nl/knip/issues/1148
  ignoreDependencies: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  // https://github.com/webpro-nl/knip/issues/1149#issuecomment-2994091874
  commitlint: true,
} satisfies KnipConfig;
