/* eslint-env node */

import { getConfig } from './rollup/utils.js';

export default getConfig('./markdown.js', {
	format: 'cjs',
	external: ['markdown-it', 'highlight.js'],
	plugins: [],
	sourcemap: false,
});
