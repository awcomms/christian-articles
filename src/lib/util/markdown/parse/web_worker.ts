import { to_html } from '$lib/util/markdown/parse';

onmessage = (e) => {
	console.log(e.data);
	postMessage(to_html(e.data));
};
