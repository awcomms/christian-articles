import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/search';

export const POST: RequestHandler = async ({ request }) => {
	return json(await search({ index: 'post', ...(await request.json()) }));
};
