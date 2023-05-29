import type { PageServerLoad } from './$types';
import { get } from '$lib/util/get';
import type { Post } from '$lib/types';

export const load = (async ({ params }) => {
	return {
		id: params.id,
		post: await get<Post>(params.id)
	};
}) satisfies PageServerLoad;
