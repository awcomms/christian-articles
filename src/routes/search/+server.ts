import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/search';

export const POST = (async ({ request }) => {
	return json(
		search(await request.json())
			.then((r) => r.toArray())
			.catch((e) => {
				console.log(e)
				throw error(404, e);
			})
	);
}) satisfies RequestHandler;
