export type Filter<Type> = {
	field: string;
	type: Type
}

export type Filters = Array<Tag | Text | Range | Num>

export interface Tag extends Filter<'tag'> {
	values: string[];
}

export interface Text extends Filter<'text'> {
	value: string;
}

export interface Range extends Filter<'range'> {
	start: number;
	end: number;
}

export interface Num extends Filter<'num'> {
	value: number;
}