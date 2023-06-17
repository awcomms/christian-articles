import { openai } from '$lib/util/openai';
import { error, json, type RequestHandler } from '@sveltejs/kit';

const model = 'text-embedding-ada-002';

export const POST = (async ({ request }) => {
	return openai
		.createEmbedding({ model, input: await request.text() })
		.then((res) => {
			if (res.statusText !== 'OK') {
				throw error(500, JSON.stringify(res.data));
			}
			return json(res.data.data[0].embedding);
		})
		.catch((e) => {
			console.log('createEmbedding error', e);
			return new Response('We experienced an error processing that request', { status: 500 });
		});
}) satisfies RequestHandler;
