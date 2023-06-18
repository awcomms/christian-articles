import { client } from '$lib/util/redis';
import { embedding } from '$lib/util/embedding';
import { ids_hash } from '$lib/constants';

const build_id = (index: string, id: number) => `${index}:${id}`;

export const add_embedding = async (data: object) => {
	return { v: await embedding(JSON.stringify(data)), ...data };
};

export const create = async ({ index, data }: { index: string; data: object }) => {
	const id = await client.hIncrBy(ids_hash, index, 1);
	const item_id = build_id(index, id);
	await client.json.set(
		item_id,
		'$',
		await add_embedding({ ...data, id: item_id, created: Date.now() })
	);
	return item_id;
};
