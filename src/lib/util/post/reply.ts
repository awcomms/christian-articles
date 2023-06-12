import { client } from '../redis';

export const reply = async ({ post, target }: { post: string; target: string }) => {
	const replies: string[] = await client.json
		.get(target, { path: '$.replies' })
		.then((r) => JSON.parse(r)[0]);
	if (!replies.includes(post)) client.json.arrAppend(target, '$.replies', [post]);

	const replied: string[] = await client.json
		.get(post, { path: '$.replied' })
		.then((r) => JSON.parse(r)[0]);
	if (!replied.includes(target)) client.json.arrAppend(post, '$.replied', [target]);
};
