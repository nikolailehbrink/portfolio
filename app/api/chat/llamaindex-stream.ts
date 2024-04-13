import {
  createCallbacksTransformer,
  trimStartOfStreamHelper,
  type AIStreamCallbacksAndOptions,
} from "ai";
import type { Response } from "llamaindex";

function createParser(res: AsyncIterable<Response>) {
  const it = res[Symbol.asyncIterator]();
  const trimStartOfStream = trimStartOfStreamHelper();
  return new ReadableStream<string>({
    start() {},
    async pull(controller): Promise<void> {
      const { value, done } = await it.next();
      if (done) {
        controller.close();
        return;
      }

      const text = trimStartOfStream(value.response ?? "");
      if (text) {
        controller.enqueue(text);
      }
    },
  });
}

export function LlamaIndexStream(
  res: AsyncIterable<Response>,
  opts?: {
    callbacks?: AIStreamCallbacksAndOptions;
  },
): { stream: ReadableStream } {
  return {
    stream: createParser(res).pipeThrough(
      createCallbacksTransformer(opts?.callbacks),
    ),
  };
}
