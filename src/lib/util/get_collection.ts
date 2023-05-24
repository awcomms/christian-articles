import { client } from "./mongodb";

export const get_collection = (name: string) => client.db('call').collection(name)