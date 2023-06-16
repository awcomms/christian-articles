import { get } from '$lib/util/redis/get';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { allowed_to_view } from '$lib/util/redis/post/allowed/allowed_to_view';
import { exists } from '$lib/util/redis/exists';

const redirect_to_post = (id: string) => {
	throw redirect(302, `/post/${id}/`);
};

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!exists(params.id)) throw error(404, `${params.id} not found`);
	const { required, name, once, cost, duration, replies_alias } = await get<{
		required: boolean;
		name: string;
		once: boolean;
		cost: number;
		duration: number;
		replies_alias: string;
	}>(params.id, [`$.payment.required`, `$.name`, `$.payment.once`, `$.payment.cost`, `$.replies_alias`]);
	if (!required) redirect_to_post(params.id);
	const session = await locals.getSession();
	if (!session?.user?.email) return {};
	if (await allowed_to_view(session.user.email, params.id)) redirect_to_post(params.id);
	return { id: params.id, name, once, cost, self, duration, replies_alias };
};
