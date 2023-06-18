import { is_JSONPath } from './is_JSONPath';

export const check_JSONPaths = (
	paths: string[]
): { result: boolean; index?: number; value?: string } => {
	for (let index = 0; index < paths.length; index++) {
		const path = paths[index];
		if (!is_JSONPath(path)) {
			return {
				result: false,
				index,
				value: path
			};
		}
	}
	return { result: true };
};
