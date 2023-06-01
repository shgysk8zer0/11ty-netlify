import { plugins } from './plugins.js';

export const getConfig = ({ inline = false }) =>  ({
	map: { inline },
	plugins,
});
