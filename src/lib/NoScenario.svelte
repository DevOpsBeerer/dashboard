<script>
	import Code from '$lib/Code.svelte';
</script>

<div class="scenario-container">
	<h1>No Scenario Configured</h1>
	<p>You currently have no active scenario playing. Start a scenario to see it appears here.</p>

	<Code code="dbeerer start scenario-1" />
</div>

<style>
	div.scenario-container {
		background-color: var(--secondary-light-color);
		border-radius: 15px;
		padding: 40px;
		margin: auto;

		display: flex;
		flex-direction: column;
		gap: 1em;

		width: 600px;
		max-width: 100%;
	}

	div.scenario-container h1 {
		font-weight: 700;
		font-size: 40px;
		line-height: 51px;
	}
</style>
