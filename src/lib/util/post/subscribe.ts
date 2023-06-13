import type { Subscription } from '$lib/types/post';
import { get } from '../get';
import { client } from '../redis';
import { get_root_id } from './get_root_id';

export const subscribe = async (email: string, id: string): Promise<void> => {
	const root_post_id = await get_root_id(id);
	if (!root_post_id) throw `Encountered error getting root_post`;
	const { subscription } = await get<{ subscription: Subscription }>(root_post_id, [
		'$.subscription'
	]);
	if (!subscription.required) throw `Subscription not required for ${id}`;
	const expires = subscription.once ? 'never' : subscription.duration + Date.now();
	client.json.set(id, `$.subscriptions.${email}`, { expires });
};
