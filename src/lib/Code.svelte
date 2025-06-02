<script>
	import { onMount } from 'svelte';
	import { Copy } from '@lucide/svelte';
	import { copy } from 'svelte-copy';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';

	let { code } = $props();

	onMount(() => {
		// Extend JavaScript grammar to include your custom keyword
		Prism.languages.custom = {
			keyword: /\b(?:dbeerer)\b/
		};

		Prism.highlightAll();
	});
</script>

<div class="code">
	<pre><code class="language-custom">$ {code}</code></pre>
	<span class="copy" use:copy={code}><Copy size="16" /></span>
</div>

<style>
	pre {
		border-radius: 10px;
		background-color: var(--secondary-lighter-color) !important;
	}

	pre code {
		background-color: var(--secondary-lighter-color);
	}

	.code {
		position: relative;
	}

	.code .copy {
		position: absolute;
		top: 50%;
		right: 16px;
		transform: translate(0, -50%);
		cursor: pointer;
	}
</style>
