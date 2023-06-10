/* eslint-env node */

import { getConfig } from '@shgysk8zer0/js-utils/rollup';
import { importmap } from '@shgysk8zer0/importmap';
import { rollupImport } from '@shgysk8zer0/rollup-import';
import { rollupImportMeta } from '@shgysk8zer0/rollup-import/meta';

export default getConfig('./js/index.js', {
	minify: true,
	sourcemap: true,
	plugins: [
		rollupImport(importmap),
		rollupImportMeta({
			baseURL: process.env?.url ?? 'https://example.com/'
		})
	]
});
