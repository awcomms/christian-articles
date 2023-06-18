import type { KeyedObject } from '$lib/types';
export const shape = (obj: KeyedObject): KeyedObject => {
	if (!obj) return obj;
	return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
		const keys = key.split('.');
		keys.shift();
		keys.reduce((ao, sub_key, index) => {
			console.log(ao, sub_key, index)
			if (index === keys.length - 1) {
				ao[sub_key] = obj[key][0];
			} else {
				if (!ao[sub_key]) {
					ao[sub_key] = {};
				}
			}
			return ao[sub_key];
		}, acc);
		return acc;
	}, {});
};