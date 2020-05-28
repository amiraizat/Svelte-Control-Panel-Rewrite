<script>

	import { createEventDispatcher } from "svelte";
	export let currentTab;
	const dispatch = createEventDispatcher();

</script>

<!-- Under construction -->
<div class="tabs is-boxed">
	<ul>
		<li class:is-active={currentTab === 0}>
			<a role="button" href="#" on:click={() => dispatch("changeTab", 0)}>
				<span class="icon is-small"><i class="fas fa-columns" aria-hidden=true></i></span>
				<span>Control Panel</span>
			</a>
		</li>
		<li class:is-active={currentTab === 1}>
			<a role="button" href="#" on:click={() => dispatch("changeTab", 1)}>
				<span class="icon is-small"><i class="fas fa-file-alt" aria-hidden=true></i></span>
				<span>Preset Editor</span>
			</a>
		</li>
	</ul>
</div>

<style>
	a { text-decoration: none; }
</style>