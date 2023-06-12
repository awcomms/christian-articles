import { isJSONPath } from "./isJSONPath"

export const path_to_attr = (path: string): string => {
    if (!path || !isJSONPath(path)) return ''
    return path.split('$.')[0]
}