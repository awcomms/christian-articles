import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { collections } from '$lib/util/mongodb';

export const POST = (async ({ request }) => {
	return json(await collections.posts.insertOne(await request.json()));
}) satisfies RequestHandler;
