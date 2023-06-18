import { is_object } from '$lib/util/is_object';
import { sanitize } from 'isomorphic-dompurify';
import type { KeyedObject } from '$lib/types';

export const sanitize_object = (object: KeyedObject) => {
	for (const [key, value] of Object.entries(object)) {
		if (typeof value === 'string') {
			object[key] = sanitize(value);
		} else if (is_object(value)) {
			object[key] = sanitize_object(value as KeyedObject);
		} else {
			return object;
		}
	}
	return object;
};
