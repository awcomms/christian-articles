import { redirect, text, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/redis/create';
import { posts_index_name } from '$lib/constants';
import { escape } from '$lib/util/escape';
import { del } from '$lib/util/redis/del';
import { update } from '$lib/util/update';
import { get_root_id } from '$lib/util/redis/post/get_root_id';
import { exists } from '$lib/util/redis/exists';
import { is_user } from '$lib/util/redis/post/users/is_user';
import type { PostEdit } from '$lib/types/Post';

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
	delete data.id;
	delete data.created; //TOD-ummm
	if (!(await is_user(session.user.email, id)))
		throw error(
			401,
			`Logged in user is not authorised
		 to perform this action`
		); //TODO
	await update({ id: root_id, data: { ...data, updated: Date.now() } });
	const create_data: PostEdit = {
		edit: { to: root_id, current: true },
		name: data.name,
		body: data.body,
		alias: data.alias,
		alias_plural: data.alias_plural,
		replies_alias: data.replies_alias,
		replied_alias: data.replied_alias
	};
	await create({
		index: posts_index_name,
		data: create_data
	});
	return new Response('done', { status: 200 });
};

export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) throw error(400, `The id of an item to delete was not provided`);
	await del(id);
	return new Response(null, { status: 204 });
};
