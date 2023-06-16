import { is_creator } from '$lib/util/redis/post/is_creator';
import { add } from '$lib/util/redis/post/members/add';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { exists } from '$lib/util/redis/exists';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'not logged in');
	if (!exists(params.id)) throw error(404, `${params.id} not found`);
	if (!is_creator(params.id, session.user.email))
		throw error(401, `${session.user.email} is not ${params.id}'s creator`);
	add({ post: params.id, email: await request.text() });
	return new Response(null, { status: 200 });
};
