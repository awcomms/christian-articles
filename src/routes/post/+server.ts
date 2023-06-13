import { redirect, text, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';
import { posts_index_name } from '$lib/constants';
import { escape } from '$lib/util/escape';
import { del } from '$lib/util/del';
import { update } from '$lib/util/update';
import { get_root_id } from '$lib/util/post/get_root_id';
import { exists } from '$lib/util/redis/exists';
import { isUser } from '$lib/util/post/isUser';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(303, '/auth');
	const data = await request.json();
	const creator = escape(session.user.email);
	data.creator = creator;
	data.users = [creator];
	return text(await create({ index: posts_index_name, data }));
};

export const PUT: RequestHandler = async ({ request, locals, url }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(302, '/auth'); //TODO
	const id = url.searchParams.get('id');
	if (!id) throw error(400, `The id of an item to update was not provided`);
	if (!(await exists(id))) throw error(404, `Item with id ${id} does not exist`);
	const root_id = await get_root_id(id);
	if (!root_id) throw error(404, `Root of post ${id} not found`);
	const { data } = await request.json();
	if (!(await isUser(session.user.email, id)))
		throw error(
			401,
			`Logged in user is not authorised
		 to perform this action`
		); //TODO
	await update({ id: root_id, data: { ...data, updated: Date.now() } });
	await create({
		index: posts_index_name,
		data: {
			name: data.name,
			body: data.body,
			version: { to: root_id, date: Date.now(), current: true }
		}
	});
	return new Response('done', { status: 200 });
};

export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) throw error(400, `The id of an item to delete was not provided`);
	await del(id);
	return new Response(null, { status: 204 });
};
