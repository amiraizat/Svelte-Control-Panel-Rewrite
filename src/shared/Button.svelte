<script>

	import { createEventDispatcher } from "svelte";

	export let buttons;
	const dispatch = createEventDispatcher();

	/*
		Pass the command to the parent, they will handle the rest
	*/
	const clicked = (command) => {
		dispatch("clicked", command)
	}

</script>

<div class="field">
	<label class="label is-small">Commands</label>
	<div class="control">
		<div class="buttons are-small">
			{#each buttons as button}
				{#if button === "show"}
					<button on:click={() => clicked("show")} class="button is-primary is-outlined">Show</button>
				{:else if button === "hide"}
					<button on:click={() => clicked("hide")} class="button is-danger is-outlined">Hide</button>
				{:else if button === "preview"}
					<button on:click={() => clicked("preview")} class="button is-warning is-outlined">Prev</button>
				{:else if button === "update"}
					<button on:click={() => clicked("update")} class="button is-primary is-outlined">Update</button>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	button { font-weight: 600; }
</style>