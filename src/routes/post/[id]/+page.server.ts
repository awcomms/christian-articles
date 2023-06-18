import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis/get';
import { error, redirect } from '@sveltejs/kit';
import { allowed_to_view } from '$lib/util/redis/post/allowed/allowed_to_view';
import { EscapedEmail, type Post } from '$lib/types';
import { paid } from '$lib/util/redis/post/paid';
import { requires_payment } from '$lib/util/redis/post/requires_payment';
import { is_user } from '$lib/util/redis/post/users/is_user';
import { exists } from '$lib/util/redis';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!(await exists(params.id))) throw error(401, '${params.id} not found');
	const post = await get<Post>(params.id, [
		'$.name',
		'$.html',
		'$.payment',
		'$.created',
		'$.updated',
		'$.creator',
		'$.replies_description',
		'$.replied_description'
	]);
	if (!post) throw error(500, `We experienced an error getting ${params.id}`);
	if (post.payment?.required) {
		if (!session || !session.user?.email) {
			throw redirect(302, `pay`);
		}
		if (!allowed_to_view(new EscapedEmail(session.user.email), params.id)) {
			throw redirect(302, `pay`);
		}
	}
	return {
		props: {
			id: params.id,
			post,
			is_user: session?.user?.email
				? await is_user(params.id, new EscapedEmail(session.user.email))
				: false,
			should_pay: (await requires_payment(params.id))
				? session?.user?.email
					? await paid(new EscapedEmail(session.user.email), params.id)
					: false
				: true
		}
	};
};
