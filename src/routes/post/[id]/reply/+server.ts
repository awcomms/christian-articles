import { get } from '$lib/util/get.js';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { reply } from '$lib/util/post/reply';
import type { RedisKey } from '$lib/types';
import { isUser } from '$lib/util/post/isUser';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const targets: RedisKey[] = await request.json();
	const post = params.id;
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(302, '/auth');

	if (!(await isUser(params.id, session.user.email)))
		throw error(
			401,
			`You may not reply with this post, for you do not own it, neither are you a contributor`
		);

	for (const target of targets) {
		if (
			!(await get<{ allow_replies: number }>(target, ['$.allow_replies']).then(
				(r) => r.allow_replies
			))
		)
			if (!isUser(target, session.user.email))
				throw error(
					401,
					`You may not reply to specified post ${target}, for it does not allow replies,and you do not own it, neither are you a contributor`
				);

		await reply({ post, target });
	}
	return new Response(null, { status: 202 });
};
