import { posts_index_name } from '$lib/constants';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/search';

export const POST: RequestHandler = async ({ request }) => {
	const res = await search({
		index: posts_index_name,
		...(await request.json())
	});
	return json({
		totalItems: res.total,
		posts: res.documents
	});
};
