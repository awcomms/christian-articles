import type { RedisKey } from '$lib/types';
import { object_value } from '$lib/util/redis/object_value';

export const is_user = (id: RedisKey, email: string) => object_value<boolean>(id, 'users', email);
