<script>

    import { createEventDispatcher, onMount } from "svelte";
    import Button from "../shared/Button.svelte";
    import Preset from "../shared/Preset.svelte";
    import LockStore from "../stores/LockStore.js";

    export let index, id, indicator, preset, title, items, buttons, lock, table;

    let panelController = {
        index: index,
        id: id,
        indicator: indicator,
        preset: preset,
        title: title,
        items: items,
        buttons: buttons,
        lock: lock,
        table: table,
        set setLock(value) {this.lock = Boolean(value)},
        get lockStatus() {return this.lock ? "Active" : "Inactive"}
    }

    let presetController, buttonController;
    const dispatch = createEventDispatcher();

    onMount(() => {
        lockCheck();
    })

	/*
		This function is used to lock and unlock the form, instruction is sent by parent
		If animation associated to a panel is active, panel must be locked
		This is meant to prevent unwanted changes to the animation when it is displayed
		Locked form's indicator will turn green when active and red when inactive
	*/
	export const lockForm = (status) => {
		let inputs = document.getElementById(id).querySelectorAll("input, textarea");
		inputs.forEach((input) => input.disabled = status);
        panelController.setLock = status;
        console.log("panelController.lock:");
        console.log(panelController.lock);
        if (panelController.preset) {
            presetController.setLock(status)
        };
		lockWrite();
    }

	/*
		The most convoluted bullshit I've ever wrote, because of variable names used
		Seriously rewrite this garbage. The logic is sound, but it's very hard to understand
		simply because how it is written
	*/
	const lockCheck = () => {
		(!$LockStore[panelController.index]) ? lockWrite() : lockRead();
    }

	/*
		Gathers all necessary lock information and
		then sends the lock information to LockStore
	*/
	const lockWrite = () => {
		const formState = () => {
            let returnObj = {}, inputsArr = [];
            returnObj["panel"] = panelController.lock;
			if (panelController.preset) {
				let preset = document.getElementById(panelController.id).querySelector("select");
				returnObj["preset"] = preset.selectedIndex;
			}
			let inputs = document.getElementById(id).querySelectorAll("input, textarea");
			inputs.forEach((input) => inputsArr.push(input.value));;
			returnObj["inputs"] = inputsArr;
			return returnObj;
        };
        console.log("Writing Locks to store:");
        console.log([formState()]);
		LockStore.update(newLock => {
			newLock[panelController.index] = formState();
			return newLock;
		});
	}

    /*
		Reads all necessary lock information from LockStore,
		manipulates panelController and controls the lock
	*/
	const lockRead = () => {
        let panelIndex = panelController.index;
        console.log("Reading Locks from store:");
        console.log([$LockStore[panelIndex]]);
        // Preset
        if (panelController.preset) {
            let presetIndex = $LockStore[panelIndex].preset;
			presetController.changeOption(presetIndex);
        }
        // Forms
		let inputs = document.getElementById(id).querySelectorAll("input, textarea");
		let valArr = $LockStore[panelIndex].inputs;
        inputs.forEach((input, i) => input.value = valArr[i]);
        
        // Controller
		panelController.setLock = $LockStore[panelIndex].panel;
		lockForm(panelController.lock);
	}

    /*
        Insert comment here
    */
    const indexTitle = (index, title) => {
        return index < 10 ? `0${index}. ${title}` : `${index}. ${title}`;
    }

    /*
        Insert comment here
    */
    const updateForms = (data) => {
        let {index, content} = data;
        let forms = document.getElementById(id).querySelectorAll("input, textarea");
        forms.forEach((form, i) => form.value = content[Object.keys(content)[i]]);
        if (panelController.preset) {
            presetController.changeOption(index);
        };
    }

	/*
		Collects all data from inputs, textarea & future items in a special #id div
		Put everything in one object and dispatch it up to the parent for processing
	*/
	const collectPanelData = (command) => {
		let inputs = document.getElementById(id).querySelectorAll("input, textarea");
		let collectedData = {index:index, id:id, command:command};
		inputs.forEach((input) => collectedData[input.name] = input.value);
		dispatch("dataCollected", collectedData);
    }

</script>

<div class="column is-one-quarter">
    <div class="card">

        <div class="card-header">
            <h1 class="card-header-title has-background-dark has-text-white">
                {indexTitle(panelController.index, panelController.title)}
            </h1>
        </div>

        <div class="card-content">

            {#if panelController.indicator}
                <div class="field">
                    <div class="control has-icons-left">
                        <input
                            class="indicator input is-small has-text-white"
                            class:is-primary={panelController.lock}
                            class:has-background-primary={panelController.lock}
                            class:is-danger={!panelController.lock}
                            class:has-background-danger={!panelController.lock}
                            value={panelController.lockStatus}
                            readonly
                        />
                        {#if panelController.lock}
                            <span class="icon is-small is-left has-text-white">
                                <i class="fas fa-eye"></i>
                            </span>
                        {:else if !panelController.lock}
                            <span class="icon is-small is-left has-text-white">
                                <i class="fas fa-eye-slash"></i>
                            </span>
                        {/if}
                    </div>
                </div>
            {/if}

            <div id={panelController.id}>
                {#if panelController.preset}
                    <Preset bind:this={presetController} presetTable={panelController.table} panelId={panelController.id} on:presetChange={(e) => updateForms(e.detail)} />
                {/if}
                {#each panelController.items as item}
                    {#if item.type === "input"}
                        <div class="field">
                            <label class="label is-small">{item.label}</label>
                            <div class="control">
                                <input name={item.name} class="input is-small" type="text" placeholder={item.placeholder} />
                            </div>
                        </div>
                    {:else if item.type === "textarea"}
                        <div class="field">
                            <label class="label is-small">{item.label}</label>
                            <div class="control">
                                <textarea name={item.name} class="textarea has-fixed-size is-small" rows="4" placeholder={item.placeholder}></textarea>
                            </div>
                        </div>
                    {/if}
                {/each}
                <Button bind:this={buttonController} buttons={panelController.buttons} on:clicked={(e) => collectPanelData(e.detail)} />
            </div>

        </div>

    </div>
</div>

<style>
    .indicator {
        font-family: "Consolas", monospace;
        font-weight: 700;
        text-transform: uppercase
    }
</style>