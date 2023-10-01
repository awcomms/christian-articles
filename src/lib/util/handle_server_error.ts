import { error } from "@sveltejs/kit"

export const handle_server_error = (e: Error) => {
    console.error(e)
    throw error(500)
}