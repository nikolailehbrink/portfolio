import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { generateBlogId } from "./utils";

/**
 * The sitemap integration can't read a page's source (see the Astro docs note
 * on `serialize`), so we derive `lastmod` ourselves from the content
 * frontmatter and hand it back as a `pathname -> ISO date` map. This gives
 * crawlers an accurate freshness signal per post instead of the build date.
 */

const BLOG_DIR = "src/content/blog";
const THOUGHTS_DIR = "src/content/thoughts";

/** Walk a directory recursively and return every `.md`/`.mdx` file path. */
function findContentFiles(dir: string): Array<string> {
  const files: Array<string> = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findContentFiles(fullPath));
    } else if (/\.mdx?$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

/** Pull a single date field out of a frontmatter block (quoted or not). */
function readFrontmatterDate(source: string, key: string): Date | null {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    return null;
  }
  const match = frontmatter[1].match(
    new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m"),
  );
  if (!match) {
    return null;
  }
  const date = new Date(match[1]);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getLastmodMap(): Map<string, string> {
  const map = new Map<string, string>();

  const collect = (
    dir: string,
    toPathname: (relativePath: string) => string,
  ) => {
    let files: Array<string>;
    try {
      files = findContentFiles(dir);
    } catch {
      return; // directory may not exist in every build context
    }
    for (const file of files) {
      const source = readFileSync(file, "utf-8");
      const lastmod =
        readFrontmatterDate(source, "modificationDate") ??
        readFrontmatterDate(source, "publicationDate");
      if (!lastmod) {
        continue;
      }
      const relativePath = file.slice(dir.length + 1).replace(/\\/g, "/");
      map.set(toPathname(relativePath), lastmod.toISOString());
    }
  };

  collect(BLOG_DIR, (rel) => `/blog/${generateBlogId(rel)}`);
  collect(THOUGHTS_DIR, (rel) => `/thoughts/${rel.split("/")[0]}`);

  return map;
}
