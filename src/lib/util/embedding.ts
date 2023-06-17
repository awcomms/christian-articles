import { embedding_model } from "$lib/constants";
import { openai } from "$lib/util/openai";

export const embedding = (input: string) =>
	openai
		.createEmbedding({ model: embedding_model, input })
		.then((r) => {
			return r.data.data[0].embedding;
		})
		.catch((e) => {
			throw new Error(`createEmbedding error, ${e}`);
		});