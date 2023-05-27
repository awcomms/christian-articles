import { find } from '$lib/util/find';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: await find({ page: 0 })
	};
};
