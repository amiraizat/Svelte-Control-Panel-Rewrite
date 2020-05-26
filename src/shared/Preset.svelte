<script>

    import { createEventDispatcher } from "svelte";
    import PresetStore from "../stores/PresetStore.js";

    export let panelId, presetTable;

    let presetController = {
        id: panelId,
        table: presetTable,
        get ready() {return $PresetStore[presetController.table] ? true : false},
        get data() {return presetController.ready ? $PresetStore[presetController.table] : null}
    }

    let selectionIndex = 0;
    let optionInstances = [];
    const dispatch = createEventDispatcher();

    /*
        Insert comment here
    */
    export const setLock = (status) => {
        let presetControls = document.getElementById(presetController.id).querySelectorAll(".preset");
        presetControls.forEach(control => control.disabled = status);
    }

    /*
        Insert comment here
    */
    export const changeOption = (index) => {
        if (optionInstances.length > 0) {
            optionInstances.forEach(option => option.selected = false);
            optionInstances[index].selected = true;
        }
    }

    /*
        Insert comment here
    */
    export const forceSelect = (index) => {
        changeOption(index);
        collectPresetData(index);
    }

    /*
        Increases the selection index by one, and loops at the end
        Changes here will immediately call for the text areas to be populated
    */
    const selectNext = () => {
        let max = presetController.data.length - 1;
        if (selectionIndex + 1 > max) {selectionIndex = 0} else {selectionIndex++};
        let selection = document.getElementById(presetController.id).querySelector("select");
        selection.selectedIndex = selectionIndex;
        collectPresetData(selectionIndex);
    }

    /*
        Decreases the selection index by one, and loops at the end
        Changes here will immediately call for the text areas to be populated
    */
    const selectPrev = () => {
        let max = presetController.data.length - 1;
        if (selectionIndex - 1 < 0) {selectionIndex = max} else {selectionIndex--};
        let selection = document.getElementById(presetController.id).querySelector("select");
        selection.selectedIndex = selectionIndex;
        collectPresetData(selectionIndex);
    }

    /*
        Changes the selection index with what the user selected
        Changes here will immediately call for the text areas to be populated
    */
    const selectPick = () => {
        let selection = document.getElementById(presetController.id).querySelector("select");
        collectPresetData(selection.selectedIndex);
    }

    /*
        Insert comment here
    */
    const collectPresetData = (index) => {
        let presetData = presetController.data;
        if (presetData) {
            let data = {index:index, content:presetData[index]}
            dispatch("presetChange", data)
        }
    }

</script>

<label class="label is-small">Presets</label>
<div class="field has-addons">
    <!-- Left Button -->
    <div class="control">
        <button class="preset button is-small" on:click={selectPrev} disabled={!presetController.ready}>
            <span class="icon is-small is-left">
                <i class="fas fa-arrow-left"></i>
            </span>
        </button>
    </div>
    <!-- Select DDL -->
    <div class="control is-expanded">
        <div class="select is-small is-fullwidth">
            <!-- Only is presetData exists -->
            {#if presetController.ready}
                <select class="preset" on:change={selectPick}>
                    {#each presetController.data as data, i}
                        <option bind:this={optionInstances[i]}>{data[Object.keys(data)[0]]}</option>
                    {/each}
                </select>
            {:else if !presetController.ready}
                <select disabled>
                    <option selected>N/A</option>
                </select>
            {/if}
        </div>
    </div>
    <!-- Right Button -->
    <div class="control">
        <button class="preset button is-small" on:click={selectNext} disabled={!presetController.ready}>
            <span class="icon is-small is-left">
                <i class="fas fa-arrow-right"></i>
            </span>
        </button>
    </div>
</div>

<style>
    select { font-weight:700; }
</style>