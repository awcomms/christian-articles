/**
 * return (post replied and subscription_required = false).length
 */

import { posts_index_name } from '$lib/constants';
import { SingleNumber, Tag } from '$lib/types/filter';
import type { Subscription } from '$lib/types/post';
import { get } from '../get';
import { search } from '../search';

export const subscription_required = async (id: string) =>
	(await get<Subscription>(id, ['$.subscription.self']).then((r) => r.self)) ||
	!(await search({
		index: posts_index_name,
		filters: [
			new SingleNumber('subscription_required', 0),
			new SingleNumber('current_version', 1),
			new Tag('replies', [id])
		]
	}).then((r) => r.total));
