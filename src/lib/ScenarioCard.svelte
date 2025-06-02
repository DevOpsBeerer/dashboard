<script>
	import { Check } from '@lucide/svelte';
	import Code from '$lib/Code.svelte';

	let { tags = [], name, description, features = [], scenarioId } = $props();
</script>

<div class="scenario-card">
	<h1>{name}</h1>
	<p>{description}</p>

	<div class="checks">
		{#each features as feature}
			<span>
				<Check color="#51EDA2" />
				{feature}
			</span>
		{/each}
	</div>

	{#if tags.length > 0}
		<div class="tags">
			{#each tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	{/if}

	<div class="play">
		Play scenario:
		<Code code="dbeerer start {scenarioId}" />
	</div>
</div>

<style>
	div.scenario-card {
		background-color: var(--secondary-light-color);
		border-radius: 15px;
		padding: 40px;

		display: flex;
		flex-direction: column;
		gap: 1em;

		width: 400px;
		max-width: 100%;
	}

	div.scenario-card h1 {
		font-weight: 700;
		font-size: 32px;
		line-height: 41px;
	}

	div.scenario-card p {
		color: #aaaaaa;
	}

	div.scenario-card .checks {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	div.scenario-card .checks > span {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	div.scenario-card .play {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	div.scenario-card .code {
		display: flex;
		padding: 10px;
		border-radius: 10px;
		background-color: var(--secondary-lighter-color);
	}

	div.scenario-card .code .primary {
		padding: 0 0.25em;
		font-weight: 600;
	}
</style>
