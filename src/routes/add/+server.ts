import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';

export const POST = (async ({ request }) => {
	return json(await create(await request.json()));
}) satisfies RequestHandler;
