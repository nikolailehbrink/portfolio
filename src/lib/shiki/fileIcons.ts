import { FileCssIcon } from "@phosphor-icons/react/dist/ssr/FileCss";
import { FileCsvIcon } from "@phosphor-icons/react/dist/ssr/FileCsv";
import { FileHtmlIcon } from "@phosphor-icons/react/dist/ssr/FileHtml";
import { FileJsIcon } from "@phosphor-icons/react/dist/ssr/FileJs";
import { FileJsxIcon } from "@phosphor-icons/react/dist/ssr/FileJsx";
import { FileMdIcon } from "@phosphor-icons/react/dist/ssr/FileMd";
import { FileTsIcon } from "@phosphor-icons/react/dist/ssr/FileTs";
import { FileTsxIcon } from "@phosphor-icons/react/dist/ssr/FileTsx";

export const LANGUAGE_FILE_ICONS = new Map([
  ["html", FileHtmlIcon],
  ["css", FileCssIcon],
  ["js", FileJsIcon],
  ["ts", FileTsIcon],
  ["jsx", FileJsxIcon],
  ["tsx", FileTsxIcon],
  ["md", FileMdIcon],
  ["csv", FileCsvIcon],
]);
