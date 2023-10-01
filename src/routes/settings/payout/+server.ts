import { client } from '$lib/util/redis';
import { update } from '$lib/util/redis/update';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { EscapedEmail } from '$lib/types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession()
	if (!session?.user?.email) throw error(401)
	const email = new EscapedEmail(session.user.email)
	const { data } = await request.json();
	// TODO! validation, scrutinize
    await client.json.set(email.value, '$.payout', data).catch((e) => {
        console.log(e)
		throw error(500);
	});
	return new Response(null, { status: 202 });
};
