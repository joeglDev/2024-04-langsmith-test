import { Ollama } from "langchain/llms/ollama";

export const getCompletion = async(prompt: string, client: Ollama) => {
    const stream = await client.stream(prompt);
    const chunks = [];
    
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    const response = chunks.join("");
    return response
  };