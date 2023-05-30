import { client } from "./redis";

export const get = <Type>(id: string): Promise<Type> => client.hGetAll(id); client.hGet
