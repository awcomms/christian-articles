import { embedding_field_name, embedding_model } from '$lib/constants';
import { openai } from './openai';
import { client, float32Buffer } from './redis';

export const search = async ({
	index,
	page,
	input
}: {
	index: string;
	page: number;
	input: string;
}) => {
	let v;
	try {
		v = await openai
			.createEmbedding({ model: embedding_model, input })
			.then((r) => r.data.data[0].embedding);
	} catch (e) {
		console.error(e);
	}

	if (!v) throw 'An Error occured'

	console.log(v)

	const results = await client.ft.search(index, `*=>[KNN 7 @${embedding_field_name} $BLOB AS ${embedding_field_name}`, {
		PARAMS: {
			BLOB: float32Buffer(v)
		},
		SORTBY: `${embedding_field_name}`,
		DIALECT: 2,
		LIMIT: { from: page, size: 21 },
		RETURN: ['name', 'body', 'user', 'id'],
	});
	return results.documents;
};
