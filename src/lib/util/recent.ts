import { items_per_page } from '$lib/constants';
import { client } from './redis';

interface ReturnType<T> {
	total: number;
	documents: T[];
}

export const recent = async <T>({
	index,
	page,
	filters,
	count
}: {
	index: string;
	page: number;
	filters?: Record<string, string>;
	count?: boolean;
}): ReturnType<T> => {
	let query = '';
	if (filters && Object.keys(filters).length) {
		// Object.entries(filters).forEach((f) => (query += `@${f[0]}:"test\\@\\ 2B140gmail.com"`));
		Object.entries(filters).forEach((f) => (query += `@${f[0]}:"${f[1]}"`));
	} else {
		query = '*';
	}
	console.log(query)
	const from = count ? 0 : page > 1 ? (page - 1) * items_per_page : 0; 
	return await client.ft.search(index, query, {
		SORTBY: {
			BY: 'created',
			DIRECTION: 'DESC'
		},
		LIMIT: count
			? { from: 0, size: 0 }
			: { from, size: items_per_page },
		RETURN: ['name', 'body', 'id', 'user_email', 'user_name'], // TODO how to return all fields at once
		// DIALECT: 2
	});
};
