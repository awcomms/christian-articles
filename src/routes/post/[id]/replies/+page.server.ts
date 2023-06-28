import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis/get';
import { search } from '$lib/util/redis/post/search';
import type { Filters } from '$lib/types/filter';

export const load: PageServerLoad = async ({ params }) => {
	const filters: Filters = [{ type: 'tag', field: 'replies', values: [params.id] }];
	const res = await search({ filters, page: 1 });
	return {...res, filters, post: await get<{name: string, id: string, allow_replies: boolean}>(params.id, ['$.name', '$.id', '$.allow_replies'])}
};
