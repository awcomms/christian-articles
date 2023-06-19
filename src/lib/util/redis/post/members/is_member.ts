import { object_value } from '$lib/util/redis/object_value';
import type { EscapedEmail, RedisKey } from '$lib/types';

export const is_member = ({ email, post }: { email: EscapedEmail; post: RedisKey }) =>
	object_value<string>(post, 'members', email.value);
