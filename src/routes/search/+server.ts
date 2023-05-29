import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/search';

export const POST = (async ({ request }) => {
	const results = await search(await request.json());

	return json(results.documents.map((d) => ({ id: d.id, ...d.value })));
}) satisfies RequestHandler;
