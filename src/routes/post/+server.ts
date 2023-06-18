import { text, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/redis/create';
import { posts_index_name } from '$lib/constants';
import { escape_email } from '$lib/util/escape_email';

import { add } from '$lib/util/redis/post/users/add';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'not_logged_in');
	const data = await request.json();
	data.creator = escape_email(session.user.email);
	data.current_version = true;
	const id = await create({ index: posts_index_name, data });
	console.log(data);
	await add(id, data.creator);
	return text(id);
};
