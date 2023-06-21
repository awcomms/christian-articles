import type { PageServerLoad } from './$types';
import { get } from '$lib/util/redis/get';
import { error, redirect } from '@sveltejs/kit';
import { allowed } from '$lib/util/redis/post/allowed';
import { EscapedEmail, type Post } from '$lib/types';
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
	const email = session?.user?.email ? new EscapedEmail(session.user.email) : null;
	if (post.payment?.required && post.payment.self) {
		if (!email) {
			throw redirect(302, `pay`);
		}
		if (!allowed(email, params.id)) {
			throw redirect(302, `pay`);
		}
	}
	return {
		props: {
			id: params.id,
			post,
			is_user: email ? await is_user(params.id, email) : false,
			should_pay: post.payment.required ? (email ? await allowed(email, params.id) : true) : false
		}
	};
};
