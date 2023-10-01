import { client } from '$lib/util/redis';

export const unreply = async ({ post, target }: { post: string; target: string }) => {
	const replies_index = await client.json.arrIndex(target, '$.replies', post)
	if (!replies_index) return
	await client.json.arrPop(target, '$.replies', Number(replies_index))

	const replied_index = await client.json.arrIndex(post, '$.replied', target)
	if (!replied_index) return
	await client.json.arrPop(post, '$.replied', Number(replied_index));
};