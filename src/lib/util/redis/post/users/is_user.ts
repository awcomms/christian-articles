import type { EscapedEmail, RedisKey } from '$lib/types';
import { object_value } from '$lib/util/redis/object_value';

export const is_user = async (id: RedisKey, email: EscapedEmail): Promise<boolean> =>
	await object_value<string>(id, 'users', email.value) ? true : false;
