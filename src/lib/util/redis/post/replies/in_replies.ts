import type { RedisKey } from '$lib/types';
import { json_array_index } from '../../json_array_index';

export const in_replies = ({ post, target }: { post: RedisKey; target: RedisKey }) =>
	json_array_index(target, 'replies', post) ?? undefined;
