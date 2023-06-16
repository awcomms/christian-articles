// import { find } from '$lib/util/find';
import { search } from '$lib/util/redis/post/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { ...(await search({ page: 0 })) };
};
