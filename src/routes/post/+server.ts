import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';
import { posts_index_name } from '$lib/constants';

export const POST = (async ({ request }) => {
	return text(await create({index: posts_index_name, data: await request.json()}));
}) satisfies RequestHandler;
