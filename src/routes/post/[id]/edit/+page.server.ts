import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { get_root_id } from '$lib/util/redis/post/get_root_id';
import { get } from '$lib/util/redis/get';
import { editable_attributes } from '$lib/constants';
import { is_user } from '$lib/util/redis/post/users/is_user';
import { EscapedEmail, type Post } from '$lib/types';
import { exists } from '$lib/util/redis/exists';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!(await exists(params.id))) throw error(404, `${params.id} not found`);
	const session = await locals.getSession();
	if (!session?.user?.email) {
		throw redirect(303, '/auth');
	}
	if (await !is_user(params.id, new EscapedEmail(session.user.email))) {
		throw error(401, `Logged in user is not authorized to access this page`);
	}

	const root_id = await get_root_id(params.id);
	if (!root_id) throw error(404, `Root of ${params.id} not found`);
	const post = await get<Post>(root_id, editable_attributes.map(a => `$.${a}`), false);
	console.log('ep', post)
	return {
		id: params.id,
		post
	};
};
