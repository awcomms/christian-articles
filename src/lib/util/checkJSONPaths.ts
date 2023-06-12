import { isJSONPath } from './isJSONPath';

export const checkJSONPaths = (paths: string[]): { result: boolean; index?: number } => {
	for (let index = 0; index < paths.length; index++) {
		const path = paths[index];
		if (!isJSONPath(path)) {
			return {
				result: false,
				index
			};
		}
	}
	return { result: true };
};
