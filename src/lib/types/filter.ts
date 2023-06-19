export type Filter<Type extends 'tag' | 'text' | 'bool' | 'num'> = {
	field: string;
	type: Type;
};

export type Filters = Array<Tag | Text | Bool | Num>;

export interface Tag extends Filter<'tag'> {
	values: string[];
}

export interface Text extends Filter<'text'> {
	value: string;
}

export interface Bool extends Filter<'bool'> {
	value: boolean;
}

export interface Num extends Filter<'num'> {
	start: number;
	end: number;
}
