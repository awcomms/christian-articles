import { checkJSONPaths } from './checkJSONPaths';
import { client } from './redis';
import { shape } from './shape';

export const get = async <Type>(id: string, path: string[]): Promise<Type> => {
	const isPathRes = checkJSONPaths(path);
	if (!isPathRes.result) throw { message: 'not_path', ...isPathRes };
	const args: [string, { path: string[] }?] = [id];
	if (path) args.push({ path });
	return await client.json.get(...args).then((r) => shape(r));
};
