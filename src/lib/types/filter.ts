export type FilterType = 'tag' | 'text' | 'number' | 'number_range';

export type Filter = SingleNumber | NumberRange | Tag | Text;

export class Tag {
	field: string;
	values: string[];

	constructor(field: string, values: string[]) {
		this.field = field;
		this.values = values;
	}
}

export class Text {
	field: string;
	value: string;

	constructor(field: string, value: string) {
		this.field = field,
		this.value = value
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
}

export class SingleNumber {
	field: string;
	value: number;

	constructor(field: string, value: number) {
		this.field = field;
		this.value = value;
	}
}
