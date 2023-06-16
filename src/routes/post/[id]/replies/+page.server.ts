import type { PageServerLoad } from './$types';
import { replies } from '$lib/util/redis/post/replies/replies';

export const load: PageServerLoad = async ({ params }) => {
	return { ...(await replies({ reference: params.id })) };
};
