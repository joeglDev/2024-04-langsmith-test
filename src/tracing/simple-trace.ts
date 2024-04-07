import dotenv from 'dotenv';
import { traceable } from "langsmith/traceable";
import { wrapSDK } from "langsmith/wrappers";
import { ollamaModel } from "../ollama/model.js";
import { getCompletion } from "../ollama/model.functions.js";

dotenv.config();

// Auto-trace LLM calls in-context
const client = wrapSDK(ollamaModel);
const simpleTrace =  traceable(async (prompt: string) => await getCompletion(prompt, client));
const traceRun = await simpleTrace("Please introduce yourself");
console.log(traceRun)
