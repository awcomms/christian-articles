import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { collection } from '$lib/util/collection';

export const POST = (async ({ request }) => {
	return json(await collection.insertOne(await request.json()));
}) satisfies RequestHandler;
