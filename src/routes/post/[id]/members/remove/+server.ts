import { is_creator } from '$lib/util/redis/post/is_creator';
import { remove } from '$lib/util/redis/post/members/remove';
import { error } from '@sveltejs/kit';
import { exists } from '$lib/util/redis/exists';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'not logged in');
	if (!exists(params.id)) throw error(404, `${params.id} not found`);
	if (!is_creator(params.id, session.user.email))
		throw error(401, `${session.user.email} is not ${params.id}'s creator`);
	remove({ post: params.id, email: session.user.email });
	return new Response(null, { status: 200 });
};
