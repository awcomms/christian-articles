import { get } from '../get';
import { client } from '../redis';
import { shape } from '../shape';

export const unreply = async ({ post, target }: { post: string; target: string }) => {
	const { replies } = await get(target, ['$.replies']); //TODO-URGENT
	if (replies.includes(post)) client.json.arrPop(target, '$.replies', replies.indexOf(post));

	const { replied } = await get(post, ['$.replied']);
	if (replied.includes(target)) client.json.arrPop(post, '$.replied', replied.indexOf(target));
};
