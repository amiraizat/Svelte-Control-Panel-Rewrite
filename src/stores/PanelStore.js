import { writable } from "svelte/store";
import panelJSON from "../json/panels.json";

const getPanels = (panelData) => {
    panelData.forEach(panel => Object.defineProperty(panel, "preset", {get:() => {return panel.table ? true : false}}));
    return panelData;
}

const panels = writable(getPanels(panelJSON));

export default panels;