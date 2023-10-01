import { client } from '$lib/util/redis';
import { in_replied } from '$lib/util/redis/post/replies/in_replied';
import { in_replies } from '$lib/util/redis/post/replies/in_replies';
import { set_requires_payment } from '../set_requires_payment';

export const reply = async ({ post, target }: { post: string; target: string }) => {
	if (!(await in_replies({ post, target }))) await client.json.arrAppend(target, `$.replies`, post);

	if (!(await in_replied({ post, target }))) await client.json.arrAppend(post, `$.replied`, target);
	await set_requires_payment(post);
};
