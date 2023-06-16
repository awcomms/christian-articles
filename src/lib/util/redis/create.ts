import { embedding_model, ids_hash } from '$lib/constants';
import { openai } from '$lib/util/openai';
import { client } from '$lib/util/redis';

const build_id = (index: string, id: number) => `${index}:${id}`;

export const add_embedding = async (data: object) => {
	const v = await openai
		.createEmbedding({ model: embedding_model, input: JSON.stringify(data) })
		.then((r) => {
			return r.data.data[0].embedding;
		});
	return { v, ...data };
};

export const create = async ({ index, data }: { index: string; data: object }) => {
	console.log('create', index, data);
	const id = await client.hIncrBy(ids_hash, index, 1);
	const item_id = build_id(index, id);
	const res = await client.json.set(
		item_id,
		'$',
		await add_embedding({ ...data, id: item_id, created: Date.now() })
	);
	console.log('create_res', res);
	return item_id;
};
