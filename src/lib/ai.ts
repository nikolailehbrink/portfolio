import { createGateway } from "@ai-sdk/gateway";
import { devToolsMiddleware } from "@ai-sdk/devtools";
import { wrapLanguageModel } from "ai";

const gateway = createGateway({
  apiKey: import.meta.env.AI_GATEWAY_API_KEY,
});

// The concrete model object `wrapLanguageModel` accepts - not the wider
// `LanguageModel`, which also allows a bare model-id string.
type WrappableModel = Parameters<typeof wrapLanguageModel>[0]["model"];

function withDevTools(model: WrappableModel) {
  if (!import.meta.env.DEV) {
    return model;
  }
  return wrapLanguageModel({ model, middleware: devToolsMiddleware() });
}

export const CHAT_MODEL = withDevTools(gateway("openai/gpt-5.4-mini"));
export const SUGGESTIONS_MODEL = withDevTools(gateway("openai/gpt-5.4-mini"));
