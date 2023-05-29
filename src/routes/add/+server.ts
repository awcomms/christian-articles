import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';

export const POST = (async ({ request }) => {
	return text(await create({index: 'posts', data: await request.json()}));
}) satisfies RequestHandler;
