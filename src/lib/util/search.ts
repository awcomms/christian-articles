import { embedding_field_name, embedding_model, items_per_page } from '$lib/constants';
import type { SearchOptions } from 'redis';
import { client, float32Buffer } from './redis';
import { openai } from './openai';
import type { Filter } from '$lib/types/filter';
import { NumberRange, SingleNumber, Tag, Text } from '$lib/types/filter';

interface ReturnType<T> {
	total: number;
	documents: T[];
}

export interface SearchParams {
	index: string;
	page?: number;
	filters?: Filter[];
	count?: boolean;
	RETURN: string[];
	search?: string | number[];
}

export const search = async <T>({
	index,
	page,
	filters,
	count,
	search,
	RETURN
}: SearchParams): Promise<ReturnType<T>> => {
	const options: SearchOptions = {
		RETURN,
		DIALECT: 3
	};

	if (page) {
		options.LIMIT = count
			? { from: 0, size: 0 }
			: { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page };
	}

	let query = '';

	if (filters && filters.length) {
		filters.forEach((filter) => {
			switch (filter.constructor) {
				case Tag:
					query += ` @${filter.field}:{${(<Tag>filter).values.map(
						(v, i) => `${v}${i === v.length - 1 ? '' : ' |'}`
					)}}"`;
					break;
				case SingleNumber:
					query += ` @${filter.field}:[${(<SingleNumber>filter).value} ${
						(<SingleNumber>filter).value
					}]`;
					break;
				case NumberRange:
					query += ` @${filter.field}:[${(<NumberRange>filter).start} ${
						(<NumberRange>filter).end
					}]`;
					break;
				case Text:
					query += ` @${(<Text>filter).field}:(${(<Text>filter).value})`;
			}
		});
	} else {
		query = '*';
	}

	if (search) {
		query += `=>[KNN 7 @${embedding_field_name} $BLOB${filters ? ' HYBRID_POLICY ADHOC_BF' : ''}]`; //TODO set ADHOC_BF only if filters
		options.PARAMS = {
			BLOB:
				typeof search === 'string'
					? float32Buffer(
							await openai
								.createEmbedding({ model: embedding_model, input: search })
								.then((r) => r.data.data[0].embedding)
					  )
					: float32Buffer(search)
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
