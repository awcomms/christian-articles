import { client } from '$lib/util/redis';
import { in_replied } from '$lib/util/redis/post/replies/in_replied';
import { in_replies } from '$lib/util/redis/post/replies/in_replies';

export const unreply = async ({ post, target }: { post: string; target: string }) => {
	if (await in_replies({ post, target })) await client.json.set(target, `$.replies.${post}`, null);

	if (await in_replied({ post, target })) await client.json.set(post, `$.replied.${target}`, null);
};
