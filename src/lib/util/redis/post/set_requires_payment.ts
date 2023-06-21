import type { RedisKey } from '$lib/types';
import { client } from '$lib/util/redis';
import { calculate_requires_payment } from '$lib/util/redis/post/calculate_requires_payment';

export const set_requires_payment = async (id: RedisKey) => {
	client.json.set(id, '$.requires_payment', await calculate_requires_payment(id));
};
