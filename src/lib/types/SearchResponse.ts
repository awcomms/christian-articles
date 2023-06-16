export interface SearchResponse<Type> {
    total: number,
    documents: Type[],
    page?: number 
}