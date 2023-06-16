import { client } from '.';

export const json_array_index = async (key: string, path: string, value: string) => {
	const res = await client.json.arrIndex(key, path, value);
	if (Array.isArray(res)) {
		return res[0];
	} else {
		return res;
	}
};
