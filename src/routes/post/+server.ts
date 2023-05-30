import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';
import { posts_index_name } from '$lib/constants';
import { recent } from '$lib/util/recent';
import { count } from '$lib/util/count';

export const POST = (async ({ request }) => {
	return text(await create({ index: posts_index_name, data: await request.json() }));
}) satisfies RequestHandler;

export const GET: RequestHandler = async ({ url }) => {
	const page = url.searchParams.get('page');
	console.log('rpage', page)
	return json({
		totalItems: await count(posts_index_name),
		posts: await recent({
			index: posts_index_name,
			page: Number(page) || 0
		})
	});
};
