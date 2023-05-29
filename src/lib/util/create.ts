import { embedding_model, ids_hash } from '$lib/constants';
import { openai } from './openai';
import { client, float32Buffer } from './redis';

const build_id = (index: string, id: number) => `${index}:${id}`;

export const v_blob = async (data: object) => {
	const v = await openai
		.createEmbedding({ model: embedding_model, input: JSON.stringify(data) })
		.then((r) => {
			return r.data.data[0].embedding;
		})
		.catch((e) => {
			throw `OpenAI Embeddings error: ${e}`;
		});
	console.log('_v', v);
	const blob = float32Buffer(v);
	console.log(data);
	return { v: blob, ...data };
};

export const create = async ({ index, data }: { index: string; data: object }) => {
	console.log('create', index, data);
	const id = await client.hIncrBy(ids_hash, index, 1);
	const item_id = build_id(index, id);
	await client.hSet(item_id, await v_blob(data));
	return item_id;
};
