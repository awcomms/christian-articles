import { embedding_model } from "$lib/constants";
import { openai } from "$lib/util/openai";

export const embedding = (input: string) =>
	openai
		.createEmbedding({ model: embedding_model, input })
		.then((r) => {
			return r.data.data[0].embedding;
		})
		.catch((e) => {
			const error = e.response.status === 429 ? "We experienced a rate limit error. Please try again in a few moments" : e.response.data
			throw new Error(`createEmbedding error, ${error}`);
		});