import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/post/search';
import { handle_server_error } from '$lib/util/handle_server_error';

export const POST: RequestHandler = async ({ request, locals }) => {
	const args = await request.json();
	const session = await locals.getSession();
	if (session?.user?.email) args.email = session.user.email;
	return search(args).then(r => json(r)).catch(e => handle_server_error(e))
};
