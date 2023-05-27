import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { owner } from '$lib/util/owner';
import { not_owner } from '$lib/util/not_owner';
import { collections } from '$lib/util/mongodb';

export const POST = (async ({ request, locals }) => {
	const data = await request.json();
	const session = await locals.getSession()
	if (!session || !session.user) throw error(401, 'Not logged in') //TODO
	if (session.user.email !== data.user) throw error(401, not_owner(data.id)) //TODO
	return json(await collections.posts.updateOne({ id: data.id }, data));
}) satisfies RequestHandler;
