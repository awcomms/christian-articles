import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { find } from '$lib/util/find';

export const POST = (async ({ request }) => {
	return json(find(await request.json()));
}) satisfies RequestHandler;
