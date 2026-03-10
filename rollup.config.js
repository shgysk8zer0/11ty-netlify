import { getConfig } from '@shgysk8zer0/js-utils/rollup';
import { importmap } from '@shgysk8zer0/importmap';
import { rollupImport } from '@shgysk8zer0/rollup-import';
import { rollupImportMeta } from '@shgysk8zer0/rollup-import/meta';
import pkg from './package.json' with { type: 'json' };

export default getConfig('./js/index.js', {
	minify: true,
	sourcemap: true,
	plugins: [
		rollupImport(importmap),
		rollupImportMeta({
			baseURL: process.env?.url ?? pkg.homepage
		})
	]
});
