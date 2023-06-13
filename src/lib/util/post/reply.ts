import { client } from '../redis';
import { get } from '../get';

export const reply = async ({ post, target }: { post: string; target: string }) => {
	if (
		!(await get<{ [index: string]: boolean }>(target, [`$.replies.${post}`]).then((r) => r[post]))
	)
		await client.json.set(target, `$.replies.${post}`, true);

	if (
		!(await get<{ [index: string]: boolean }>(post, [`$.replied.${target}`]).then((r) => r[target]))
	)
		await client.json.set(post, `$.replied.${target}`, true);
};
