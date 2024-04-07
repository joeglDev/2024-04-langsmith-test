import dotenv from 'dotenv';
import { Client } from "langsmith";
import { TEST_EVALUATION_INPUT, TEST_EVALUATION_KEYWORDS, TEST_EVALUATION_OUTPUTS } from "../ollama/constants.js";
import { runEvaluation } from "./simple-evaluation.functions.js";

dotenv.config();

const client = new Client();
export const datasetName = "DnD Battle Log: Contains all phrases";

try {
 // Define dataset: these are your test cases
const dataset = await client.createDataset(datasetName, {
    description: "Dungeons and Dragons 3 battle log prompts.",
  });
  
  await client.createExamples({
      inputs: [
          {question: TEST_EVALUATION_INPUT},
      ],
      outputs: [
          {mentions_keywords: TEST_EVALUATION_KEYWORDS}
      ],
      datasetId: dataset.id,
  });
  
  console.log('Creating new dataset ', datasetName);
  console.log('Running evaluations');
  await runEvaluation();
} catch (error: any) {
    console.log('Running evaluations')
    await runEvaluation()
}

