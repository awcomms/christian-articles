import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis/get';
import { search } from '$lib/util/redis/post/search';
import type { Filters } from '$lib/types/filter';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const filters: Filters = [{ type: 'tag', field: 'replies', values: [params.id] }];
	return await search({ filters, page: 1 }).then(async(res) => {
		return {
			...res,
			filters,
			post: await get<{ name: string; id: string; allow_replies: boolean }>(params.id, [
				'$.name',
				'$.id',
				'$.allow_replies'
			])
		};
	}).catch((e) => {
		console.error(e)
		throw error(500, `Encountered an error attempting to get replies to item ${params.id}`)
	});
};
