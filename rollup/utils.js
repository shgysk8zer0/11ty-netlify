import { extname } from 'node:path';
import { readFile } from 'node:fs/promises';
import { plugins as PLUGINS } from './plugins.js';

export const ONWARN = warning => {
	if (warning.code === 'MISSING_GLOBAL_NAME') {
		throw new Error(warning.message);
	} else if (warning.code !== 'CIRCULAR_DEPENDENCY') {
		console.warn(`(!) ${warning.message}`);
	}
};

export const EXTERNAL = ['node:fs', 'node:fs/promises', 'node:crypto', 'node:path'];
export const GLOBALS = {};
export const DEFAULT_EXT = '.min.js';
export const ESLINT_CONFIG = '.eslintrc.json';
export const EXTS = {
	'.cjs': ['cjs', 'commonjs'],
	'.mjs': ['es', 'esm', 'module'],
	'.min.js': ['iife'],
};

export function getExtension(format) {
	const found = Object.entries(EXTS).find(([, formats]) => formats.includes(format));
	return found[0];
}

export function getFormat(ext) {
	if (ext in EXTS) {
		return EXTS[ext][0];
	}
}

export async function getConfig(input, {
	format = 'iife',
	sourcemap = true,
	external = EXTERNAL,
	plugins = PLUGINS,
	onwarn = ONWARN,
	eslintConfig = ESLINT_CONFIG,
} = {}) {
	const ext = getExtension(format);
	const { globals = {}} = typeof eslintConfig === 'string'
		? await getESLintConfig(eslintConfig)
		: {};

	return {
		input, external, onwarn, plugins,
		output: {
			file: input.replace(extname(input), ext),
			format, sourcemap, globals,
		},
	};
}

export async function getESLintConfig(path = ESLINT_CONFIG) {
	try {
		const config = await readFile(path, { encoding: 'utf8' });

		return JSON.parse(config);
	} catch(err) {
		console.error(err);
		return GLOBALS;
	}
}
