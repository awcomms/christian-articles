import type { KeyedObject } from "$lib/types";

export const is_object = (v: unknown): v is KeyedObject => Object.prototype.toString.call(v) === '[object Object]';
