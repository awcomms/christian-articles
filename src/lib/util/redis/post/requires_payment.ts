import type { RedisKey } from '$lib/types';
import { get } from '$lib/util/redis/get';

export const requires_payment = (id: RedisKey) => {
	return get<{ requires_payment: boolean }>(id, [`$.requires_payment`]).then(
		(r) => r.requires_payment
	);
};
