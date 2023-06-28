import { EscapedEmail, type Post } from '$lib/types';
import { get } from '$lib/util/redis/get';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { is_user } from '$lib/util/redis/post/users/is_user';

type Res = Pick<Post, 'id' | 'allow_replies'>;

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'No logged in user');
	const post = await get<Res>(params.id, ['$.id', '$.allow_replies']);
	console.log('p', post)
	if (!post.allow_replies && !(await is_user(params.id, new EscapedEmail(session.user.email))))
		throw error(400, `Currently logged in user not allowed to reply ${params.id}`);
	return {
		post
	};
};
