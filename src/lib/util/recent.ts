import { client } from './redis';

export const recent = (index: string) => {
	return client.ft.search(index, '*', {
		SORTBY: 'created',
		LIMIT: { from: 0, size: 10 },
		RETURN: ['*']
	});
};
