import { similar } from '$lib/util/redis/post/similar';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	let page = 0;
	if (url.searchParams.get('page')) {
		page = Number(url.searchParams.get('page'));
		if (isNaN(page)) page = 0;
	}
	return { ...(await similar({ id: params.id, page })), id: params.id };
};
