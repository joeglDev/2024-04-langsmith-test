import { ollamaModel } from "../ollama/model.js";
import { Run, Example } from "langsmith";
import { EvaluationResult } from "langsmith/evaluation";
import { runOnDataset } from "langchain/smith";
import { datasetName } from "./simple-evaluation.js";
import { getCompletion } from "../ollama/model.functions.js";

async function predictResult({ question }: { question: string }) {
    const output = await getCompletion(question, ollamaModel);
    return output
}

// Define evaluators
// Issue: returns 0 if missed some phrases, 1 if returns phrases
export const mustMention = async ({ run, example }: { run: Run; example?: Example; }): Promise<EvaluationResult> => {
  const mustMention: string[] = example?.outputs?.must_mention ?? [];
  const output = run?.outputs?.output;
  const score = mustMention.every((phrase) => output.includes(phrase)
  );
  return {
    key: "must_mention",
    score: score,
  };
};

// run evaluation
export const runEvaluation = async () => {
    await runOnDataset(
        predictResult,
        datasetName, // The data to predict and grade over
        {
            evaluationConfig: { customEvaluators: [mustMention] },
            projectMetadata: {
                version: "1.0.0",
                revision_id: "beta",
            },
        }
    );
};

