import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { collection } from '$lib/util/collection';
import { owner } from '$lib/util/owner';
import { not_owner } from '$lib/util/not_owner';

export const POST = (async ({ request }) => {
	const data = await request.json();
	if (!owner(data.user)) throw error(401, not_owner(data.id))
	return json(await collection.updateOne({ id: data.id }, data));
}) satisfies RequestHandler;
