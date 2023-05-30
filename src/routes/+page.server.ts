// import { find } from '$lib/util/find';
import { posts_index_name } from '$lib/constants';
import type { PostEntry } from '$lib/types';
import { search } from '$lib/util/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await search<PostEntry>({ index: posts_index_name, page: 0 });
	return {
		totalItems: res.total,
		posts: res.documents
	};
};
