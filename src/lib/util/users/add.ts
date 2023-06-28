import { users_index_name } from "$lib/constants"
import { create } from "../redis/create"

export interface Args {
    name: string
    email: string
}

export const add = async (data: Args) => {
    await create({index: users_index_name, data})
}