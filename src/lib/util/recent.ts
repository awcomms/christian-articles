import { client } from './redis';

export const recent = async <Type>({
	index,
	page: from
}: {
	index: string;
	page: number;
}): Type[] => {
	const results = await client.ft.search(index, '*', {
		SORTBY: {
			BY: 'created',
			DIRECTION: 'DESC'
		},
		LIMIT: { from, size: 21 },
		RETURN: ['name', 'body', 'user', 'id'],
		DIALECT: 2
	});
	console.log(results)
	return results.documents;
};
