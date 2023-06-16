import { client } from '$lib/util/redis';
import { is_member } from './is_member';

export const add = async ({ post, email }: { post: string; email: string }) => {
	if (!is_member({ post, email })) await client.json.set(email, `$.replies.${post}`, post);

	// if ( TODO-add post to user members field
	// 	!(await get<{ [index: string]: boolean }>(post, [`$.replied.${target}`]).then((r) => r[target]))
	// )
	// 	await client.json.set(post, `$.replied.${target}`, true);
};
