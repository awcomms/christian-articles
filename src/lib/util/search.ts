import { embedding_field_name, embedding_model } from '$lib/constants';
import { openai } from './openai';
import { client, float32Buffer } from './redis';

export const search = async ({ index, page, input }: { index: string; page: number, input: string }) => {
	const v = await openai
		.createEmbedding({ model: embedding_model, input })
		.then((r) => r.data.data[0].embedding);

	const results = await client.ft.search(index, `*=>[KNN 7 @${embedding_field_name} $BLOB`, {
		PARAMS: {
			BLOB: float32Buffer(v)
		},
		SORTBY: `__${embedding_field_name}_score`,
		LIMIT: { from: page, size: 21 },
		RETURN: ['name', 'body', 'user', 'id'],
		DIALECT: 2
	});
	return results.documents;
};
