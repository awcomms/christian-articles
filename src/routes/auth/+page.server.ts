import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async({locals}) => {
    const session = await locals.getSession()
    if (session?.user) {
        redirect(303, '/') //TODO 303?
    }
}