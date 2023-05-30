import { posts_index_name } from '$lib/constants';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { recent } from '$lib/util/recent';

export const POST: RequestHandler = async ({ request }) => {
	const { page, filters } = await request.json();
	const res = await recent({
		index: posts_index_name,
		page,
		filters
	});
	return json({
		totalItems: res.total,
		posts: res.documents
	});
};
