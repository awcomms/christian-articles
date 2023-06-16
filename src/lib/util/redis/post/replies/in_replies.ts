import { object_value } from '$lib/util/redis/object_value';
import type { RedisKey } from '$lib/types';

export const in_replies = ({ post, target }: { post: RedisKey; target: RedisKey }) =>
	object_value<boolean>(target, 'replies', post);
