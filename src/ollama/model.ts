import { Ollama } from "@langchain/community/llms/ollama";

export const ollamaModel = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "orca-mini", 
});

