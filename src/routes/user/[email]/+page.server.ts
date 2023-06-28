import { escape_email } from '$lib/util/escape_email';
import { search } from '$lib/util/redis/post/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const filters = [{ type: 'text', field: 'creator', value: escape_email(params.email) }]
	const res = await search({
		filters,
	});
	return {
		user: params.email,
		totalItems: res.total,
		posts: res.documents
	};
};
