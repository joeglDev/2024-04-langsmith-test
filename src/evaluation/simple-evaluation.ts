import dotenv from 'dotenv';
import { Client } from "langsmith";
import { TEST_EVALUATION_INPUT, TEST_EVALUATION_OUTPUTS } from "../ollama/constants.js";
import { runEvaluation } from "./simple-evaluation.functions.js";

dotenv.config();

const client = new Client();
export const datasetName = "DnD Battle Log: Contains all phrases";

try {
 // Define dataset: these are your test cases
 console.log('Creating new dataset ', datasetName)
const dataset = await client.createDataset(datasetName, {
    description: "Dungeons and Dragons 3 battle log prompts.",
  });
  
  await client.createExamples({
      inputs: [
          {question: TEST_EVALUATION_INPUT},
      ],
      outputs: [
          {must_mention: TEST_EVALUATION_OUTPUTS},
      ],
      datasetId: dataset.id,
  });
  
  console.log('Running evaluations')
  await runEvaluation()
} catch (error: any) {
    console.log('Running evaluations')
    await runEvaluation()
}

