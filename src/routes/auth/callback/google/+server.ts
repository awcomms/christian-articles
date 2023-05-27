import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	console.log(`auth/callback ${await request.json()}`);
	return new Response(null, { status: 200 });
};
