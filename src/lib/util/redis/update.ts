import { is_object } from '$lib/util/is_object';
import { client } from '.';
import type { RedisJSON } from '@redis/json/dist//commands';
import { embedding } from '../embedding';

type Values = { [index: string]: RedisJSON };

const include = (prefix: string, obj: Values, accumulator: Values) => {
	for (const [key, value] of Object.entries(obj)) {
		if (is_object(value)) {
			include(`${prefix}.${key}`, value as Values, accumulator);
		} else {
			accumulator[`${prefix}.{key}`] = value;
		}
	}
};

export const update = async ({ id, data }: { id: string; data: RedisJSON }) => {
	if (!is_object) client.json.set(id, '$', data);
	const values: Values = {
		'$.embedding': await embedding(JSON.stringify(data))
	};
	include('$', data as Values, values);
	for (const [path, value] of Object.entries(values)) {
		await client.json.set(id, path, value);
	}
};
