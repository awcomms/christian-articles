import type { Subscription } from '$lib/types/post';
import { get } from '../get';
import { client } from '../redis';
import { get_root_id } from './get_root_id';

export const subscribe = async (email: string, id: string): Promise<number> => {
	const root_post_id = await get_root_id(id);
	if (!root_post_id) throw `Encountered error getting root_post`;
	const root_post_expires = await get<{subscription: Subscription}>(root_post_id, ['$.subscription.expires']).then(
		(r) => r.subscription.duration
	);
	const expires = root_post_expires + Date.now();
	return client.json
		.arrAppend(root_post_id, '$.subscribers', [{ email, expires }])
		.then(() => expires);
};
