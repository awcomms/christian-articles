import { content_attributes } from "$lib/constants";
import type { Post } from "$lib/types";

export const merge_root_and_current = (root: Post, current: Post) => {
	const res: Post = root;
	content_attributes.forEach((attr) => {
		res[attr] = current[attr];
	});
	return res;
};
