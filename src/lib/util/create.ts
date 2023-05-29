import { ids_hash } from "$lib/constants"
import { client } from "./redis"

export const create = (index: string, data: object) => {
    let id = client.hGet(ids_hash, index)
}