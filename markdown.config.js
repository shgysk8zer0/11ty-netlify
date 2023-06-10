/* eslint-env node */

import { getConfig } from '@shgysk8zer0/js-utils/rollup';

export default getConfig('./markdown.js', {
	format: 'cjs',
	external: ['markdown-it', 'highlight.js'],
	plugins: [],
	minify: false,
	sourcemap: false,
});
