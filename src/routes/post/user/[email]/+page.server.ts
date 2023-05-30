import { posts_index_name } from '$lib/constants';
import type { PostEntry } from '$lib/types';
import { escape } from '$lib/util/escape';
import { recent } from '$lib/util/recent';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user_email_escaped = escape(params.email);
	console.log(user_email_escaped)
	const res = await recent<PostEntry>({
		index: posts_index_name,
		page: 0,
		filters: { user_email_escaped: escape(params.email) }
	});
	return {
		user: params.email,
		totalItems: res.total,
		posts: res.documents
	};
};
