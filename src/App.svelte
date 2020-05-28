<script>

	import "bulma/css/bulma.css";
	import ControlPanel from "./components/ControlPanel.svelte";
	import PresetEditor from "./components/PresetEditor.svelte";
	import Tab from "./shared/Tab.svelte";
	
	// Selection changes the component being displayed
	let selection = 0;
	const components = [ControlPanel, PresetEditor];

	const changeComponent = (value) => {
		selection = value;
	}

</script>

<section class="section">
	<Tab currentTab={selection} on:changeTab={(e) => changeComponent(e.detail)} />
	<svelte:component this={components[selection]} />
</section>