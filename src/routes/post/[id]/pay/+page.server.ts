import { get } from '$lib/util/redis/get';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { allowed } from '$lib/util/redis/post/allowed';
import { exists } from '$lib/util/redis/exists';
import { EscapedEmail } from '$lib/types';
import type { Currency } from '$lib/util/paystack/currencies';

const redirect_to_post = (id: string) => {
	throw redirect(302, `/post/${id}/`);
};

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!exists(params.id)) throw error(404, `${params.id} not found`);
	const { required, name, once, cost, duration, replies_description } = await get<{
		required: boolean;
		name: string;
		once: boolean;
		cost: number;
		duration: number;
		replies_description: string;
	}>(params.id, [
		`$.payment.required`,
		`$.name`,
		`$.payment.once`,
		`$.payment.cost`,
		`$.replies_description`
	]);
	if (!required) redirect_to_post(params.id);
	const session = await locals.getSession();
	if (!session?.user?.email) return {};
	const email = new EscapedEmail(session.user.email);
	if (await allowed(email, params.id)) redirect_to_post(params.id);
	const { currency } = await get<{ currency: Currency }>(email.value, ['$.payout.currency']);
	if (!currency)
		throw error(500, `Encountered an error attempting to get post's creator's preferred currency`);
	return { id: params.id, name, once, cost, self, duration, replies_description, currency };
};
