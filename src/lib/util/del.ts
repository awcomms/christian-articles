import { client } from "./redis";

export const del = (id: string) => client.del(id).catch((e) => console.error(`client.del(${id}) error: ${e}`));