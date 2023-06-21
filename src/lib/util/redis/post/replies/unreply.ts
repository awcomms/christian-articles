import { client } from '$lib/util/redis';
import { in_replied } from '$lib/util/redis/post/replies/in_replied';
import { in_replies } from '$lib/util/redis/post/replies/in_replies';
import { set_requires_payment } from '$lib/util/redis/post/set_requires_payment';

export const unreply = async ({ post, target }: { post: string; target: string }) => {
	if (await in_replies({ post, target })) await client.json.set(target, `$.replies.${post}`, null);

	if (await in_replied({ post, target })) await client.json.set(post, `$.replied.${target}`, null);
	await set_requires_payment(post)
};
