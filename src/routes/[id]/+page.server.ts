import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { collections } from '$lib/util/mongodb';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
	const _id = new ObjectId(params.id)
	return {
		post: await collections.posts.findOne({ _id }).then((r) => {
			if (!r) throw error(404, `Post ${params.id} not found`);
			return r;
		})
	};
}) satisfies PageServerLoad;
