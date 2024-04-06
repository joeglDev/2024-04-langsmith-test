import { Ollama } from "@langchain/community/llms/ollama";
import { getCompletion } from "./model.functions.js";

export const ollamaModel = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "orca-mini", 
});

const testPrompt = `Give me a fun fact about cats.`;
const response = await getCompletion(testPrompt);
console.log(response)