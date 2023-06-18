import { browser } from '$app/environment';
import { sanitize } from 'isomorphic-dompurify';
import dompurify from 'dompurify';
// import { JSDOM } from 'jsdom';

export const sanitize_string = (text: string): string => {
	if (browser) {
		return dompurify.sanitize(text);
	} else {
		sanitize(text);
		// return DOMPurify(new JSDOM('').window).sanitize(text);
	}
};
