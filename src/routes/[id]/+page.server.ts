import type { Post } from '$lib/types';
import { collection } from '$lib/util/collection';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		post: await collection.findOne<Post>({ id: params.id }).then((r) => {
            if (!r) throw error(404, `Post ${params.id} not found`);
            return r
		})
	};
}) satisfies PageServerLoad;
