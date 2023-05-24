export interface Post {
    name: string,
    body: string,
    id: string,
    embedding: Embedding
}

export type Embedding = Array<number>