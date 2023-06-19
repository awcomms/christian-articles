import type { RequestHandler } from './$types';
import { del } from '$lib/util/redis/del';
import { update } from '$lib/util/redis/update';
import { get_root_id } from '$lib/util/redis/post/get_root_id';
import { exists } from '$lib/util/redis/exists';
import { is_user } from '$lib/util/redis/post/users/is_user';
import type { PostEdit } from '$lib/types/Post';
import { error } from '@sveltejs/kit';
import { posts_index_name } from '$lib/constants';
import { create } from '$lib/util/redis/create';
import { EscapedEmail } from '$lib/types';
import { unauthorized_user_error } from '$lib/util/errors/unauthorized_user_error';

export const PUT: RequestHandler = async ({ request, locals, params }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) {
		throw error(401, 'You are not logged in');
	}
	const { id } = params;
	if (!(await exists(id))) {
		throw error(404, `Item with id ${id} does not exist`);
	}
	const root_id = await get_root_id(id);
	if (!root_id) {
		throw error(404, `Encountered an error getting the root post of post ${id}. It was not found`);
	}
	const { data } = await request.json();
	if (!(await is_user(id, new EscapedEmail(session.user.email)))) {
		throw error(401, unauthorized_user_error(session.user.email));
	}
	await update({ id: root_id, data: { ...data, updated: Date.now() } });
	const edit_create_data: PostEdit = {
		edit: { to: root_id, current: true },
		name: data.name,
		body: data.body,
		alias: data.alias,
		alias_plural: data.alias_plural,
		replies_description: data.replies_description,
		replied_description: data.replied_description
	};
	await create({
		index: posts_index_name,
		data: edit_create_data
	});
	return new Response('done', { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'You are not logged in');
	const { id } = params;
	if (!(await is_user(id, new EscapedEmail(session.user.email))))
		throw error(401, unauthorized_user_error(session.user.email));
	await del(id);
	return new Response(null, { status: 204 });
};
