export interface PathValue {
	path: string;
	value: unknown[];
}

export const shape = (obj: object): Record<string, unknown> | undefined => {
	return Object.keys(obj).reduce((acc, key) => {
		acc[key.substring(2)] = obj[key];
		return acc;
	}, {});
};
