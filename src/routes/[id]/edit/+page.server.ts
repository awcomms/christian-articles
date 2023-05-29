import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { get } from '$lib/util/get';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const post = await get<Post>(params.id);
	if (!post) throw error(404, `${params.id} not found`);
	const session = await locals.getSession();
	if (!session || !session.user) {
		throw redirect(303, '/auth');
	}
	if (session.user.email !== post.user) {
		throw error(401, `Logged in user is not authorized to access this page`);
	}
	return {
		id: params.id,
		post
	};
};
