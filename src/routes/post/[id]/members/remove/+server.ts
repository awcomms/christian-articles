import { is_creator } from '$lib/util/redis/post/is_creator';
import { remove } from '$lib/util/redis/post/members/remove';
import { error } from '@sveltejs/kit';
import { exists } from '$lib/util/redis/exists';
import type { RequestHandler } from './$types';
import { EscapedEmail } from '$lib/types';

export const POST: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'You are not logged in');
	if (!exists(params.id)) throw error(404, `${params.id} not found`);
	const email = new EscapedEmail(session.user.email)
	if (!is_creator(params.id, email))
		throw error(401, `${email.value} is not ${params.id}'s creator`);
	remove({ post: params.id, email: (email) });
	return new Response(null, { status: 200 });
};
