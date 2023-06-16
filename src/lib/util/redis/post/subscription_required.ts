/**
 * return (post replied and payment_required = false).length
 */

import { SingleNumber, Tag } from '$lib/types/filter';
import type { Payment } from '$lib/types/Post';
import { get } from '$lib/util/redis/get';
import { search } from './search';

export const payment_required = async (id: string) =>
	(await get<Payment>(id, ['$.payment.self']).then((r) => r.self)) ||
	!(await search({
		filters: [
			new SingleNumber('payment_required', 0),
			new SingleNumber('current_version', 1),
			new Tag('replies', [id])
		]
	}).then((r) => r.total));
