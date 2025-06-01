<script lang="ts">
	import ScenarioCard from '$lib/ScenarioCard.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="scenarios-container">
	{#if data.scenarios && data.scenarios.length > 0}
		{#each data.scenarios as scenario}
			<ScenarioCard
				flag={scenario.flag}
				name={scenario.name}
				description={scenario.description}
				scenarioId={scenario.id}
			/>
		{/each}
	{:else}
		<ScenarioCard
			flag="No Scenarios"
			name="No ScenarioDefinitions Found"
			description="No ScenarioDefinitions are currently available in the cluster."
			scenarioId="no-scenarios"
		/>
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
