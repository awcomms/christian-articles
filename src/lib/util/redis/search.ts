import { embedding_field_name, items_per_page } from '$lib/constants';
import type { SearchOptions } from 'redis';
import { client, float32Buffer } from '.';
import type { Filter } from '$lib/types/filter';
import { NumberRange, SingleNumber, Tag, Text } from '$lib/types/filter';
import type { SearchResponse } from '$lib/types/SearchResponse';
import { embedding } from '$lib/util/embedding';
import { slim } from '../shape/slim';

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
	// filters,
	count,
	search,
	RETURN
}: SearchParams): Promise<SearchResponse<T>> => {
	const options: SearchOptions = {
		RETURN,
		DIALECT: 3
	};

	if (page) {
		options.LIMIT = count
			? { from: 0, size: 0 }
			: { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page };
	}

	let query = '*';
	let extra_args = ''; // ' HYBRID_POLICY ADHOC_BF';

	// if (filters && filters.length) {
	// 	// filters.forEach((filter) => {
	// 	// 	switch (filter.constructor) {
	// 	// 		case Tag:
	// 	// 			query += ` @${filter.field}:{${(<Tag>filter).values.map(
	// 	// 				(v, i) => `${v}${i === v.length - 1 ? '' : ' |'}`
	// 	// 			)}}"`;
	// 	// 			break;
	// 	// 		case SingleNumber:
	// 	// 			query += ` @${filter.field}:[${(<SingleNumber>filter).value} ${
	// 	// 				(<SingleNumber>filter).value
	// 	// 			}]`;
	// 	// 			break;
	// 	// 		case NumberRange:
	// 	// 			query += ` @${filter.field}:[${(<NumberRange>filter).start} ${
	// 	// 				(<NumberRange>filter).end
	// 	// 			}]`;
	// 	// 			break;
	// 	// 		case Text:
	// 	// 			query += ` @${(<Text>filter).field}:(${(<Text>filter).value})`;
	// 	// 	}
	// 	// });
	// 	extra_args = ' HYBRID_POLICY ADHOC_BF';
	// } else {
	// 	query = '*';
	// }

	if (search) {
		query += `=>[KNN 7 @${embedding_field_name} $BLOB${extra_args}]`; //TODO set ADHOC_BF only if filters
		options.PARAMS = {
			BLOB:
				typeof search === 'string' ? float32Buffer(await embedding(search)) : float32Buffer(search)
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

	const res = await client.ft.search(index, query, options);
	res.documents = res.documents.map((r) => {
		r.value = slim(r.value, true);
		console.log('rrv', r.value)
		return r;
	});
	return res;
};
