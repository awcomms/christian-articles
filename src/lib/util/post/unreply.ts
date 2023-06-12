import { posts_index_name } from '$lib/constants';
import { get } from '../get';
import { inRedisArray } from '../inRedisArray';
import { client } from '../redis';
import { shape } from '../shape';

export const unreply = async ({ post, target }: { post: string; target: string }) => {
	if (await inRedisArray(posts_index_name, 'id', target, 'replies', post))
		client.json.arrPop(target, '$.replies', replies.indexOf(post));

	if (await inRedisArray(posts_index_name, 'id', post, 'replied', target))
		client.json.arrPop(post, '$.replied', replied.indexOf(target));
};
