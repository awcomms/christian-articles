import { text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { count } from "$lib/util/count";

export const GET: RequestHandler = async() => text(await count('posts'))