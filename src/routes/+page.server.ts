// import { find } from '$lib/util/find';
import { posts_index_name } from '$lib/constants';
import type { PostEntry } from '$lib/types';
import { recent } from '$lib/util/recent';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await recent<PostEntry>({ index: posts_index_name, page: 0 })
	return {
		totalItems: res.total,
		posts: res.documents
	};
};
