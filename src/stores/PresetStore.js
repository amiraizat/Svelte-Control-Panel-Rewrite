import { writable } from "svelte/store";
/*
	Test storage representing Sqlite tables of the same name
*/
let presets = writable({
	name_designation:[
		{name: "Didier Drogba", designation: "Chelsea FC Legend"},
		{name: "Frank Lampard", designation: "Chelsea FC Manager"},
		{name: "Hideki Kamiya", designation: "Game Designer, PlatinumGames"},
		{name: "Hidetaka Miyazaki", designation: "President, FROMSOFTWARE"}
	],
	headline_detail:[
		{headline: "Bloodborne Remastered announced", details: "Running on the PS5 in 4K at 120fps with ray-tracing enabled"},
		{headline: "Persona 5 Royal coming to Steam", details: "Atlus pledges future to PC gaming, wants fanbase of hit game to grow"}
	]
});

export default presets;