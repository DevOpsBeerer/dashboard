<script>
	import { onMount } from 'svelte';
	import Code from '$lib/Code.svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-yaml.min.js';

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="scenario-container">
	<h1>No Scenario Definition Configured</h1>
	<p>You currently have no scenario to play with.</p>

	<Code code="dbeerer scenarios install" />

	<p>You can create a scenario with this yaml definition:</p>
	<div class="code">
		<pre><code class="language-yaml"
				>apiVersion: devopsbeerer.ch/v1alpha1
kind: ScenarioDefinition
metadata:
  name: scenario-1
spec:
  name: "Scenario 1"
  id: "scenario-1"
  description: "A simple scenario with a SPA and an API"
  tags: ["oauth2", "authorization-code", "crud", "api", "keycloak"]
  features:
    - "OAuth2 Authorization Code Flow"
    - "Access Token Management"
    - "Basic CRUD Operations"
    - "Role-based Access (User/Admin)"
    - "RESTful API"
  helmChart:
    link: "https://github.com/DevOpsBeerer/playground-scenarios-charts.git"
    dir: "scenario-1"</code
			></pre>
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
