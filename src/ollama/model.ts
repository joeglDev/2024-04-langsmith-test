import { Ollama } from "@langchain/community/llms/ollama";
import { MODEL_NAME, MODEL_URL } from "./constants.js";

export const ollamaModel = new Ollama({
  baseUrl: MODEL_URL,
  model: MODEL_NAME, 
});

