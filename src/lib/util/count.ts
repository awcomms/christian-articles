import { client } from './redis';

export const count = (index: string): Promise<string> =>
	client.ft.info(index).then((r) => {
		console.log(r.numDocs);
		return r.numDocs;
	});
