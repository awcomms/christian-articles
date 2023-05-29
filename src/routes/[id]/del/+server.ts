import { del } from '$lib/util/del';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	await del(params.id);
	return new Response(null, { status: 204 });
};
