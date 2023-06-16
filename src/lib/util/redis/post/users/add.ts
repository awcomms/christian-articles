import { client } from '$lib/util/redis';
import { is_user } from '$lib/util/redis/post/users/is_user';
import type { RedisKey } from '$lib/types';

export const add = async (id: RedisKey, email: string) => {
	if (!(await is_user(id, email))) client.json.set(id, `$.users.${email}`, email);
};
