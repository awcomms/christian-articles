import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis';
import { search } from '$lib/util/redis/post/search';
import type { Filters } from '$lib/types/filter';

export const load: PageServerLoad = async ({ params }) => {
	const filters: Filters = [{ type: 'tag', field: 'replies', values: [params.id] }];
	const res = await search({ filters, page: 1 });
	return { props: {...res, filters, post: await get<{name: string}>(params.id, ['$.name'])} };
};
