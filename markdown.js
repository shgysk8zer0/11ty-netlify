#!/usr/bin/env node
/* eslint-env node */

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

export const markdownIt = new MarkdownIt({
	html: true,
	linkify: false,
	breaks: true,
	langPrefix: 'language-',
	highlight: function(str, language) {
		if (typeof str === 'string' && typeof hljs.getLanguage(language) !== 'undefined') {
			try {
				return `<pre class="hljs ${this.langPrefix}${language}"><code>${hljs.highlight(str, { language, ignoreIllegals: true }).value}</code></pre>`;
			} catch(e) {
				console.error(e);
				return `<pre class="hljs"><code>${this.utils.escapeHtml(str)}</code></pre>`;
			}
		} else {
			return `<pre class="hljs"><code>${this.utils.escapeHtml(str)}</code></pre>`;
		}
	}
});
