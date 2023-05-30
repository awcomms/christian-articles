import { items_per_page } from '$lib/constants';
import { client } from './redis';

export const recent = async <Type>({ index, page }: { index: string; page: number }): Type[] => {
	const results = await client.ft.search(index, '*', {
		SORTBY: {
			BY: 'created',
			DIRECTION: 'DESC'
		},
		LIMIT: { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page },
		RETURN: ['name', 'body', 'user', 'id']
		// DIALECT: 2
	});
	console.log(results);
	return results.documents;
};
