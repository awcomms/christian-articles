import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { get_root_id } from '$lib/util/post/get_root_id';
import { get_current_version_id } from '$lib/util/post/get_current_version_id';
import { get } from '$lib/util/get';
import { content_attributes, editable_attributes } from '$lib/constants';
import { isUser } from '$lib/util/post/isUser';
import type { Post } from '$lib/types';
import { exists } from '$lib/util/redis/exists';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (! await exists(params.id)) throw error(404, `${params.id} not found`);
		const session = await locals.getSession();
	if (!session?.user?.email) {
		throw redirect(303, '/auth');
	}
	if (await !isUser(session.user.email, params.id)) {
		throw error(401, `Logged in user is not authorized to access this page`);
	}

	const root_id = await get_root_id(params.id);
	if (!root_id) throw error(404, `Root of ${params.id} not found`)
	const post = await get<Post>(root_id, editable_attributes);
	return {
		id: params.id,
		post
	};
};
