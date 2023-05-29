// import { find } from '$lib/util/find';
import type { PostEntry } from '$lib/types';
import { count } from '$lib/util/count';
import { recent } from '$lib/util/recent';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		totalItems: await count('post'),
		posts: await recent<PostEntry>({ index: 'post', page: 0 })
	};
};
