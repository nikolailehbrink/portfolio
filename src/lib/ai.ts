import { devToolsMiddleware } from "@ai-sdk/devtools";
import { gateway, wrapLanguageModel, type GatewayModelId } from "ai";

// The gateway authenticates via OIDC by reading `process.env.VERCEL_OIDC_TOKEN`.
// In production Vercel injects it automatically; locally `astro dev` only loads
// `.env` into `import.meta.env`, never `process.env`, so the lookup fails with a
// misleading "Unauthenticated request to AI Gateway". Bridge it in dev only -
// this block is tree-shaken from the production build, so no token is inlined.
if (import.meta.env.DEV) {
  process.env.VERCEL_OIDC_TOKEN ??= import.meta.env.VERCEL_OIDC_TOKEN;
}

function withDevTools(modelId: GatewayModelId) {
  if (!import.meta.env.DEV) {
    return modelId;
  }
  return wrapLanguageModel({
    model: gateway(modelId),
    middleware: devToolsMiddleware(),
  });
}

export const CHAT_MODEL = withDevTools("openai/gpt-5.4-mini");
export const SUGGESTIONS_MODEL = withDevTools("openai/gpt-5.4-mini");

export const CHAT_KNOWLEDGE_BASE = import.meta.env.CHAT_KNOWLEDGE_BASE;
