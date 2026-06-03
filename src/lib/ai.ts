import { createGateway } from "@ai-sdk/gateway";

const gateway = createGateway({
  apiKey: import.meta.env.AI_GATEWAY_API_KEY,
});

export const CHAT_MODEL = gateway("openai/gpt-5.4-mini");
export const SUGGESTIONS_MODEL = gateway("openai/gpt-5.4-mini");
