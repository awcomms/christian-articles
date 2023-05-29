import { del } from '$lib/util/del';
import type { RequestHandler } from './$types';
import { json, error, redirect } from '@sveltejs/kit';
import { update } from '$lib/util/update';

export const PUT: RequestHandler = async ({ request, locals }) => {
	const { id, data } = await request.json();
	const session = await locals.getSession();
	if (!session || !session.user) throw redirect(302, '/auth'); //TODO
	if (session.user.email !== data.user_email)
		throw error(401, `Logged in user is not authorised to perform this action`); //TODO
	return json(await update({ id, data }));
};

export const DELETE: RequestHandler = async ({ params }) => {
	await del(params.id);
	return new Response(null, { status: 204 });
};
