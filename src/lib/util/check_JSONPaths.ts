import { isJSONPath } from './isJSONPath';

export const check_JSONPaths = (paths: string[]): { result: boolean; index?: number, value: string } => {
	for (let index = 0; index < paths.length; index++) {
		const path = paths[index];
		if (!isJSONPath(path)) {
			return {
				result: false,
				index,
				value: path
			};
		}
	}
	return { result: true };
};
