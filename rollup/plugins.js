import terser from '@rollup/plugin-terser';
import { rollupImport } from '@shgysk8zer0/rollup-import';
import { importmap } from '@shgysk8zer0/importmap';

export const plugins = [
	rollupImport(importmap),
	terser(),
];
