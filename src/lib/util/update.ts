import { add_embedding } from '$lib/util/redis/create';
import { client } from './redis';

export const update = async ({ id, data }: { id: string; data: object }) =>
	client.json.set(id, '$', await add_embedding(data));
