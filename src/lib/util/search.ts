import { embedding_field_name, embedding_model, items_per_page } from '$lib/constants';
import type { SearchOptions } from 'redis';
import { client, float32Buffer } from './redis';
import { openai } from './openai';

interface ReturnType<T> {
	total: number;
	documents: T[];
}

export const search = async <T>({
	index,
	page,
	filters,
	count,
	search
}: {
	index: string;
	page: number;
	filters?: Record<string, string>;
	count?: boolean;
	search?: string;
}): ReturnType<T> => {
	const options: SearchOptions = {
		LIMIT: count
			? { from: 0, size: 0 }
			: { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page },
		RETURN: ['name', 'body', 'id', 'user_email', 'user_name'], // TODO how to return all fields at once
		DIALECT: 2
	};

	let query = '';

	if (filters && Object.keys(filters).length) {
		Object.entries(filters).forEach((f) => (query += `@${f[0]}:"${f[1]}"`));
	} else {
		query = '*';
	}

	if (search) {
		query += `=>[KNN 7 @${embedding_field_name} $BLOB${filters ? ' HYBRID_POLICY ADHOC_BF' : ''}]`; //TODO set ADHOC_BF only if filters
		options.PARAMS = {
			BLOB: float32Buffer(
				await openai
					.createEmbedding({ model: embedding_model, input: search })
					.then((r) => r.data.data[0].embedding)
			)
		};
		options.SORTBY = {
			BY: `__${embedding_field_name}_score`,
			DIRECTION: 'ASC'
		};
	} else {
		options.SORTBY = {
			BY: 'created',
			DIRECTION: 'DESC'
		};
	}

	return await client.ft.search(index, query, options);
};
