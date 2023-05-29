// import { find } from '$lib/util/find';
import { posts_index_name } from '$lib/constants';
import type { PostEntry } from '$lib/types';
import { count } from '$lib/util/count';
import { recent } from '$lib/util/recent';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		totalItems: await count(posts_index_name),
		posts: await recent<PostEntry>({ index: posts_index_name, page: 0 })
	};
};
