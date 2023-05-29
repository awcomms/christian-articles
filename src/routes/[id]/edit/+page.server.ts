import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { collections } from '$lib/util/mongodb';
import { ObjectId } from 'mongodb';

export const load = (async ({ params, locals }) => {
	const _id = new ObjectId(params.id)
	const post = await collections.posts.findOne({ _id }).then((r) => {
		if (!r) throw error(404, `Post ${params.id} not found`);
		return r;
	});
	const session = await locals.getSession();
	if (!session || !session.user) {
		throw redirect(303, '/auth');
	}
	if (session.user.email !== post.user) {
		throw error(401, `Logged in user is not authorized to access this page`);
	}
	return {
		post
	};
}) satisfies PageServerLoad;
