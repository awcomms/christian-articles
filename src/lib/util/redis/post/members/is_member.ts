import { object_value } from '$lib/util/redis/object_value';
import type { RedisKey } from '$lib/types';

export const is_member = ({ email, post }: { email: string; post: RedisKey }) =>
	object_value<string>(post, 'members', email);
