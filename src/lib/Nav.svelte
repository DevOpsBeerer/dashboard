<script>
	import { PanelsTopLeft, Scroll } from '@lucide/svelte';
	import { page } from '$app/state';
</script>

<nav>
	<a href="/" class={page.url.pathname === '/' ? 'current' : ''}>
		<PanelsTopLeft size="16" />
		Overview</a
	>
	<a href="/scenarios" class={page.url.pathname === '/scenarios' ? 'current' : ''}>
		<Scroll size="16" />
		Scenarios
	</a>
</nav>

<style>
	nav {
		height: 48px;

		background: var(--secondary-light-color);
		border-radius: 8px;
		padding: 0 32px;

		display: flex;
		gap: 2em;
	}

	nav a {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		height: 48px;
		font-weight: 500;

		transition: color 200ms ease-in-out;
	}

	nav a:hover, nav a.current {
		color: var(--primary-color);
	}
</style>
