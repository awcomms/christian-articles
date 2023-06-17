import type { EscapedEmail, RedisKey } from '$lib/types';
import { object_value } from '$lib/util/redis/object_value';

export const is_user = (id: RedisKey, email: EscapedEmail) =>
	object_value<string>(id, 'users', email.value);
