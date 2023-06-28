import { EscapedEmail } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(302, '/auth'); // TODO
	return { email: new EscapedEmail(session.user.email) };
};
