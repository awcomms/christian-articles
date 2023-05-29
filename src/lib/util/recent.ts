import { client } from './redis';

export const recent = async <Type>({
	index,
	page: from
}: {
	index: string;
	page: number;
}): Type[] => {
	const results = await client.ft.search(index, '*', {
		SORTBY: 'created',
		LIMIT: { from, size: 21 },
		RETURN: ['name', 'body', 'user', 'id']
	});
	console.log(results)
	return results.documents;
};
