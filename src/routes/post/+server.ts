import { redirect, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '$lib/util/create';
import { posts_index_name } from '$lib/constants';
import { escape } from '$lib/util/escape';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	if (!session || !session.user) throw redirect(303, '/auth');
	const data = await request.json();
	data.user_email = session.user.email;
	data.user_name = session.user.name;
	const user_email_escaped = escape(data.user_email);
	console.log('u', user_email_escaped)
	data.user_email_escaped = user_email_escaped
	data.test = "so1"
	console.log('du', data.user_email_escaped);
	console.log('d', data);
	return text(await create({ index: posts_index_name, data }));
};
