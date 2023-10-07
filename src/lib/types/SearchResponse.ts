export interface Document<Type> {
	id: string;
	value: Type;
}


export interface SearchDocument {
	id: string;
	value: { name: string };
}

export interface SearchResponse {
	total: number;
	documents: SearchDocument[];
	page: number;
}
