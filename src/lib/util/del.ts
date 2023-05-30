import { client } from "./redis";

export const del = (id: string) => client.del(id)