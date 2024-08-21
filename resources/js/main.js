import { DomManager } from "./DomManager.js";
import { PokeAPI } from "./PokeAPI.js";

const pokeApi = new PokeAPI();
const pokemonList = pokeApi.pokemonList;
const domManager = new DomManager(pokeApi);

await domManager.printPage(1, pokemonList);
domManager.handlePagination(pokemonList);

const ctx = document.getElementById("chartCanvas");

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
