import { get } from '$lib/util/get.js';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { user_or_creator } from '$lib/util/post/user_or_creator';
import { reply } from '$lib/util/post/reply';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const target = await request.text();
	const post = params.id;
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(302, '/auth');

	if (!(await user_or_creator(params.id, session.user.email)))
		throw error(
			401,
			`You may not reply with this post, for you do not own it, nor are you a contributor`
		);

	if (
		!Number(await get(await request.text(), ['$.allow_replies'])) &&
		!user_or_creator(target, session.user.email)
	)
		throw error(
			401,
			'You may not reply to the specified post, for you do not own it, nor are you a contributor'
		);

	await reply({ post, target });
	return new Response(null, { status: 202 });
};
