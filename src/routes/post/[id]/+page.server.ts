import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis/get';
import { redirect } from '@sveltejs/kit';
import { allowed_to_view } from '$lib/util/redis/post/allowed/allowed_to_view';
import type { Post } from '$lib/types';
import { paid } from '$lib/util/redis/post/paid';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	// const current_version_id = await get_current_version_id(params.id).catch((e) => console.log('ce', e));
	// console.log('current_version_id', current_version_id)
	const post = await get<Post>(params.id, ['$.name', '$.body', '$.payment']);
	console.log('post_res', post);
	if (post.payment.required) {
		if (!session || !session.user?.email) {
			throw redirect(302, `pay`);
		}
		if (!allowed_to_view(session.user?.email, params.id)) {
			throw redirect(302, `pay`);
		}
	}
	return {
		id: params.id,
		post,
		paid: session?.user?.email ? paid(session.user.email, params.id) : false
	};
};
