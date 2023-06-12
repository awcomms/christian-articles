import { redirect, text, json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';
import { posts_index_name } from '$lib/constants';
import { escape } from '$lib/util/escape';
import { del } from '$lib/util/del';
import { update } from '$lib/util/update';
import { client } from '$lib/util/redis';
import { get_root_id } from '$lib/util/post/get_root_id';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	if (!session || !session.user) throw redirect(303, '/auth');
	const data = await request.json();
	data.user_email = session.user.email;
	data.user_name = session.user.name;
	const creator = escape(data.user_email);
	data.creator = creator;
	data.users = [creator];
	return text(await create({ index: posts_index_name, data }));
};

export const PUT: RequestHandler = async ({ request, locals, url }) => {
	const session = await locals.getSession();
	if (!session || !session.user) throw redirect(302, '/auth'); //TODO
	const id = url.searchParams.get('id');
	if (!id) throw error(400, `The id of an item to update was not provided`);
	if (!client.exists(id)) throw error(404, `Item with id ${id} does not exist`);
	const root_id = await get_root_id(id);
	if (!root_id) throw error(404, `Root of post ${id} not found`);
	const { data } = await request.json();
	if (session.user.email !== data.user_email)
		throw error(
			401,
			`Logged in user is not authorised
		 to perform this action`
		); //TODO
	data.version = { to: root_id, date: Date.now(), current: true };
	return json(await create({ index: posts_index_name, data }));
};

export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) throw error(400, `The id of an item to delete was not provided`);
	await del(id);
	return new Response(null, { status: 204 });
};
