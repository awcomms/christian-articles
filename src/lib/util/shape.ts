export interface PathValue {
	path: string;
	value: unknown[];
}

export const shape = (paths: PathValue[]): Record<string, unknown> | undefined => {
	if (!paths || !Array.isArray(paths)) return;
	return paths.reduce((obj: Record<string, unknown>, { path, value }: PathValue) => {
		const keys = path.split('.');
		keys.reduce((acc: Record<string, unknown>, key: string, index: number) => {
			if (!acc[key]) {
				acc[key] = {};
			}
			if (index === keys.length - 1) {
				acc[key] = value[0];
			}
			return acc;
		}, obj);
		return obj;
	}, {});
};
