import { client } from '../redis';
import { json_array_index } from '../redis/json_array_index';

export const unreply = async ({ post, target }: { post: string; target: string }) => {
	const index_in_replies = await json_array_index(target, '$.replies', post);
	if (index_in_replies) client.json.arrPop(target, '$.replies', index_in_replies);

	const index_in_replied = await json_array_index(target, '$.replied', post);
	if (index_in_replied) client.json.arrPop(post, '$.replied', index_in_replied);
};
