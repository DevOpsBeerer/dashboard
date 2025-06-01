<script>
</script>

<div class="scenario-container">
	<h1>No Scenario Configured</h1>
	<p>You currently have no active scenario playing. Start a scenario to see it appears here.</p>

	<div class="code">
		$ <span class="primary"><a href="https://www.devopsbeerer.ch/" target="_blank">dbeerer</a></span> start scenario-1
	</div>
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

	div.scenario-container .code {
		display: flex;
		padding: 10px;
		border-radius: 10px;
		background-color: var(--secondary-lighter-color);
	}
	
	div.scenario-container .code .primary {
		padding: 0 0.25em;
		font-weight: 600;
	}
</style>
