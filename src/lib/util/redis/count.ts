import { client } from '.';

export const count = (index: string): Promise<number> =>
	client.ft.info(index).then((r) => {
		console.log(r.numDocs);
		return Number(r.numDocs);
	});
