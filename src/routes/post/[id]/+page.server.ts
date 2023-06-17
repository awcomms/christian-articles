import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis/get';
import { redirect } from '@sveltejs/kit';
import { allowed_to_view } from '$lib/util/redis/post/allowed/allowed_to_view';
import { EscapedEmail, type Post } from '$lib/types';
import { paid } from '$lib/util/redis/post/paid';
import { requires_payment } from '$lib/util/redis/post/requires_payment';
import { is_user } from '$lib/util/redis/post/users/is_user';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	// const current_version_id = await get_current_version_id(params.id).catch((e) => console.log('ce', e));
	const post = await get<Post>(params.id, [
		'$.name',
		'$.body',
		'$.payment',
		'$.created',
		'$.updated',
		'$.creator',
		'$.replies_description',
		'$.replied_description'
	]);
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
		is_user: session?.user?.email
			? await is_user(params.id, new EscapedEmail(session.user.email))
			: false,
		should_pay: (await requires_payment(params.id))
			? session?.user?.email
				? paid(session.user.email, params.id)
				: false
			: true
	};
};
