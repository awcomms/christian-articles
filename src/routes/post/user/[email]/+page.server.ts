import { posts_index_name } from '$lib/constants';
import type { PostEntry } from '$lib/types';
import { Tag } from '$lib/types/filter';
import { escape } from '$lib/util/escape';
import { search } from '$lib/util/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await search<PostEntry>({
		index: posts_index_name,
		page: 0,
		filters: [new Tag('creator', [escape(params.email)])]
	});
	return {
		user: params.email,
		totalItems: res.total,
		posts: res.documents
	};
};
