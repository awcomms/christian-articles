import { search } from '$lib/util/redis/post/search';
import type { RedisKey } from '$lib/types';
import { get } from '$lib/util/redis/get';

export const calculate_requires_payment = async (id: RedisKey): Promise<boolean> => {
	if (await get<{ self: boolean }>(id, ['$.payment.self'])) return true;
	return search({
		RETURN: [],
		count: true,
		filters: [
			{ type: 'tag', field: 'replies', values: [id] },
			{ type: 'bool', field: 'payment_required', value: false }
		]
	}).then((r) => !r.total);
};
