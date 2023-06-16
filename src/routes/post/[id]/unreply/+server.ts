import { get } from '$lib/util/redis/get.js';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { RedisKey } from '$lib/types';
import { is_user } from '$lib/util/redis/post/users/is_user';
import { unreply } from '$lib/util/redis/post/replies/unreply';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const targets: RedisKey[] = await request.json();
	const post = params.id;
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(302, '/auth');

	if (!(await is_user(params.id, session.user.email)))
		throw error(
			401,
			`You may not unreply with this post, for you do not own it, neither are you a contributor`
		);

	for (const target of targets) {
		// if (
		// 	!(await get<{ allow_replies: number }>(target, ['$.allow_replies']).then(
		// 		(r) => r.allow_replies
		// 	))
		// )
		// if (!is_user(target, session.user.email))
		// 	throw error(
		// 		401,
		// 		`You may not unreply  specified post ${target}, for you do not own it, neither are you a contributor`
		// 	);

		await unreply({ post, target });
	}
	return new Response(null, { status: 202 });
};
