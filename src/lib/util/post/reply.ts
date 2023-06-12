import { posts_index_name } from '$lib/constants';
import { inRedisArray } from '../inRedisArray';
import { client } from '../redis';

export const reply = async ({ post, target }: { post: string; target: string }) => {
	if (! await inRedisArray(posts_index_name, 'id', target, 'replies', post))
		await client.json.arrAppend(target, '$.replies', [post]);

	if (! await inRedisArray(posts_index_name, 'id', post, 'replied', target))
		await client.json.arrAppend(post, '$.replied', [target]);
};
