<script>

    import Panel from "../shared/Panel.svelte";
    import PanelStore from "../stores/PanelStore.js";
    
    let panelInstances = [];

    /*
        Insert comment here
    */
    const printData = (data) => {
        let {index, command} = data;
        switch (command) {
            case "show":
                panelInstances[index].lockForm(true);
                break;
            case "hide":
                panelInstances[index].lockForm(false);
                break;
            default:
                console.log("Function not ready!");
                break;
        }
    }

</script>

<section class="section">
    <div class="columns is-multiline">
        {#each $PanelStore as panel, i}
            <Panel bind:this={panelInstances[i]} {...panel} on:dataCollected={(e) => printData(e.detail)} />
        {/each}
    </div>
</section>