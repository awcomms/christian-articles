import { Text } from '$lib/types/filter';
import { escape_email } from '$lib/util/escape_email';
import { search } from '$lib/util/redis/post/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await search({
		page: 0,
		filters: [new Text('creator', escape_email(params.email))]
	});
	return {
		user: params.email,
		totalItems: res.total,
		posts: res.documents
	};
};
