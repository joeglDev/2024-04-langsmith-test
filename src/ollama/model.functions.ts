import { ollamaModel } from "./model.js";

export const getCompletion = async(prompt: string) => {
    const stream = await ollamaModel.stream(prompt);
    const chunks = [];
    
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    const response = chunks.join("");
    return response
  };