import type { LLM } from "@llamaindex/edge";
import {
  ContextChatEngine,
  serviceContextFromDefaults,
  VectorStoreIndex,
} from "@llamaindex/edge";
import type { SimpleDocumentStore } from "@llamaindex/edge/storage/docStore/SimpleDocumentStore";
import { storageContextFromDefaults } from "@llamaindex/edge/storage/StorageContext";

import { CHUNK_OVERLAP, CHUNK_SIZE, STORAGE_CACHE_DIR } from "./constants.mjs";

async function getDataSource(llm: LLM) {
  const serviceContext = serviceContextFromDefaults({
    llm,
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  const storageContext = await storageContextFromDefaults({
    persistDir: `${STORAGE_CACHE_DIR}`,
  });

  const numberOfDocs = Object.keys(
    (storageContext.docStore as SimpleDocumentStore).toDict()
  ).length;
  if (numberOfDocs === 0) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`
    );
  }
  return await VectorStoreIndex.init({
    storageContext,
    serviceContext,
  });
}

export async function createChatEngine(llm: LLM) {
  const index = await getDataSource(llm);
  const retriever = index.asRetriever();
  retriever.similarityTopK = 5;

  return new ContextChatEngine({
    chatModel: llm,
    retriever,
  });
}
