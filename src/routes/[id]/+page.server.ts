import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { collections } from '$lib/util/mongodb';

export const load = (async ({ params }) => {
	return {
		post: await collections.posts.findOne({ id: params.id }).then((r) => {
			if (!r) throw error(404, `Post ${params.id} not found`);
			return r;
		})
	};
}) satisfies PageServerLoad;
