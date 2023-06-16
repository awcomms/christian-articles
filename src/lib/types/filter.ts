export type FilterType = 'tag' | 'text' | 'number' | 'number_range';

export type Filter = SingleNumber | NumberRange | Tag | Text;

export interface SerializedFilter {
	type: string,
	[index: string]: string | string[] | number | number[]
}

export class Tag {
	field: string;
	values: string[];

	constructor(field: string, values: string[]) {
		this.field = field;
		this.values = values;
	}

	serialize() {
		return { type: 'tag', field: this.field, value: this.values };
	}
}

export class Text {
	field: string;
	value: string;

	constructor(field: string, value: string) {
		(this.field = field), (this.value = value);
	}

	serialize() {
		return { type: 'text', field: this.field, value: this.value };
	}
}

export class NumberRange {
	field: string;
	start: number;
	end: number;

	constructor(field: string, values: [number, number]) {
		this.field = field;
		this.start = values[0];
		this.end = values[1];
	}

	serialize() {
		return { type: 'number_range', start: this.start, end: this.end };
	}
}

export class SingleNumber {
	field: string;
	value: number;

	constructor(field: string, value: number) {
		this.field = field;
		this.value = value;
	}

	serialize(): SerializedFilter {
		return { type: 'single_number', field: this.field, value: this.value };
	}
}

// export const deserialize_filter = (filter: SerializedFilter) => {
// 	switch (filter.type) {
// 		case 'text':
// 			return new Text(filter.field, filter.value)
// 		case 'tag':
// 			return new Tag(filter.field, filter.values)
// 		case 'single_number':
// 			return new SingleNumber(filter.field, filter.value)
// 		case 'number_range':
// 			return new NumberRange(filter.field, filter.values)
// 	}
// }
