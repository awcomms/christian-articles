// import { find } from '$lib/util/find';
import type { PostEntry } from '$lib/types';
import { recent } from '$lib/util/recent';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: await recent<PostEntry>({ index: 'post', page: 0 })
	};
};
