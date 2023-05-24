import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { similar_posts } from '$lib/util/similar_posts';

export const POST = (async ({ request }) => {
	return json(
		similar_posts(await request.json())
			.then((r) => r.toArray())
			.catch((e) => {
				throw error(404, e);
			})
	);
}) satisfies RequestHandler;
