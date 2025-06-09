import type { Plugin, PreviewServer, ViteDevServer } from "vite";
import { renderUnicodeCompact, type QrCodeGenerateUnicodeOptions } from "uqr";

// Inspired by https://www.npmjs.com/package/vite-plugin-qrcode
export function qrcodeNetwork(options?: QrCodeGenerateUnicodeOptions): Plugin {
  return {
    name: "vite-plugin-qrcode-network",
    apply: "serve",
    configureServer(server) {
      const _listen = server.listen;
      server.listen = function (port, isRestart) {
        if (!isRestart) {
          server.httpServer?.on("listening", () => {
            setTimeout(() => displayQRCode(server, options), 0);
          });
        }
        return _listen.apply(this, [port, isRestart]);
      };
    },
    configurePreviewServer(server) {
      // Preview server has no restarts, so we can hook directly
      // The `resolvedUrls` only exist in Vite >=4.3.0, so add a guard to prevent unnecessary hook
      if ("resolvedUrls" in server) {
        server.httpServer?.on("listening", () =>
          setTimeout(() => displayQRCode(server, options), 0),
        );
      }
    },
  };
}

function displayQRCode(
  server: ViteDevServer | PreviewServer,
  options?: QrCodeGenerateUnicodeOptions,
) {
  const networkUrls = server.resolvedUrls?.network;
  if (!networkUrls || networkUrls.length === 0) return;
  for (const url of networkUrls) {
    const qrcode = renderUnicodeCompact(url, options);

    console.log();
    if (networkUrls.length > 1) {
      console.log(`${green("➜")}  ${bold("QR code for:")} ${cyan(url)}`);
      console.log();
    }
    console.log(qrcode);
  }
}

function cyan(str: string): string {
  return `\x1b[36m${str}\x1b[0m`;
}

function green(str: string): string {
  return `\x1b[32m${str}\x1b[0m`;
}

function bold(str: string): string {
  return `\x1b[1m${str}\x1b[22m`;
}
