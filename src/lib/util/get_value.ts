import { get } from './get';
import { isJSONPath } from './isJSONPath';
import { path_to_attr } from './path_to_attr';

export const get_value = async <Type>(id: string, path: string): Promise<Type> => {
    if (!isJSONPath(path)) throw 'not_path';
	const res = await get<Type>(id, [path]);
	return res[path_to_attr(path)];
};
