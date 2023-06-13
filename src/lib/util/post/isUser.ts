import type { RedisKey } from '$lib/types';
import { in_array } from './in_array';

export const isUser = (email: RedisKey, id: RedisKey) => {
	return in_array(id, '$.users', email)
};
