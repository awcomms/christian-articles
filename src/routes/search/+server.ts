import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/search';
import { posts_index_name } from '$lib/constants';

export const POST: RequestHandler = async ({ request }) => {
	return json(await search({ index: posts_index_name, ...(await request.json()) }));
};
