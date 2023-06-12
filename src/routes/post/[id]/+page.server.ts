import type { PageServerLoad } from './$types';
import { get } from '$lib/util/get';
import { redirect } from '@sveltejs/kit';
import { allowed } from '$lib/util/post/allowed/to_view';
import { get_current_version_id } from '$lib/util/post/get_current_version_id';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	const current_version_id = await get_current_version_id(params.id);
	const post = await get<Post>(current_version_id, ['$.name', '$.body', '$.subscription']);
	if (post.subscription.required) {
		if (!session || !session.user?.email) {
			throw redirect(302, `/subscription_required/${params.id}`);
		}
		if (!allowed(session.user?.email, params.id)) {
			throw redirect(302, `/subscription_required/${params.id}`);
		}
	}
	return {
		id: params.id,
		post
	};
};
