import { marked } from 'marked';
import bidi from 'marked-bidi';
import extended_tables from 'marked-extended-tables';
import { markedHighlight } from 'marked-highlight';
import katex from 'marked-katex-extension';
import { mangle } from 'marked-mangle';
import linkify_it from 'marked-linkify-it';
import hljs from 'highlight.js';

// export const marked = new Marked

export const parse_timeout = 37000;

export const options = { gfm: true, breaks: true };
export const extensions = [
	extended_tables(),
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}),
	katex({
		throwOnError: false
	}),
	linkify_it({}, {}),
	mangle(),
	bidi()
];

export const to_html = (text: string): string => {
	return marked.parse(
		text
		// .replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/u, '')
	);
};
