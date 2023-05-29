import { client } from './redis';

export const count = (index: string): Promise<number> =>
	client.ft.info(index).then((r) => {
		console.log(r.numDocs);
		return Number(r.numDocs);
	});
