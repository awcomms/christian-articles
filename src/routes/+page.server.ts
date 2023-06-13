// import { find } from '$lib/util/find';
import { search } from '$lib/util/post/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await search({ page: 0 });
	return {
		totalItems: res.total,
		posts: res.documents
	};
};
