import { check_JSONPaths } from '../check_JSONPaths';
import { client } from '.';
import { slim } from '../shape/slim';
import { shape } from '../shape';

export const get = async <Type>(id: string, path: string[], slim_shape = true): Promise<Type> => {
	const isPathRes = check_JSONPaths(path);
	if (!isPathRes.result) throw { message: 'not_path', ...isPathRes };
	const args: [string, { path: string[] }?] = [id];
	if (path) args.push({ path });
	return await client.json.get(...args).then((r) => {
		return slim_shape ? slim(r) : shape(r);
	});
};
