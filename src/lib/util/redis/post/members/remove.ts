import { client } from '$lib/util/redis';
import { is_member } from './is_member';

export const remove = async ({ email, post }: { email: string; post: string }) => {
	if (await is_member({ email, post })) await client.json.set(post, `$.replies.${email}`, null);

	// if (await get<{ [index: string]: boolean }>(email, [`$.replied.${post}`]).then((r) => r[post]))
	// 	await client.json.set(email, `$.replied.${post}`, false);
};
