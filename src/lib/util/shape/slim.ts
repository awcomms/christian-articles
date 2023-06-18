import type { KeyedObject } from '$lib/types';
import { is_object } from '$lib/util/is_object';
export const slim = (obj: KeyedObject, parse_first = false): KeyedObject => {
	console.log('so', obj);
	if (!obj || !is_object(obj)) return obj;
	return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
		const sub_keys = key.split('.');
		const last_key = sub_keys.pop();
		if (last_key) {
			const value_array = parse_first ? JSON.parse(obj[key]) : obj[key];
			acc[last_key] = value_array[0];
		}
		return acc;
	}, {});
};
