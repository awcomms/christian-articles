import type { RedisKey } from '$lib/types';
import { get } from '$lib/util/redis/get';

export const is_creator = async (id: RedisKey, email: string) =>
	(await get<{ creator: string }>(id, ['$.creator']).then((r) => r.creator)) === email;
