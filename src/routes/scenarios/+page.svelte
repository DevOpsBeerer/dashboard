<script lang="ts">
	import ScenarioCard from '$lib/ScenarioCard.svelte';
	import NoScenarioDefinition from '$lib/NoScenarioDefinition.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="scenarios-container">
	{#if data.scenarios && data.scenarios.length > 0}
		{#each data.scenarios as scenario}
			<ScenarioCard
				tags={scenario.tags}
				name={scenario.name}
				description={scenario.description}
				scenarioId={scenario.id}
				features={scenario.features}
			/>
		{/each}
	{:else}
		<NoScenarioDefinition />
	{/if}
</div>

<style>
	.scenarios-container {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: row;
		gap: 20px;
		flex-wrap: wrap;
	}
</style>
