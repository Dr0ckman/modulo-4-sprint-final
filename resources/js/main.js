import { DomManager } from "./DomManager.js";
import { PokeAPI } from "./PokeAPI.js";

const pokeApi = new PokeAPI();
await pokeApi.fetchPokemonList();
const pokemonList = pokeApi.pokemonList;
const domManager = new DomManager(pokeApi);

await domManager.printPage(1, pokemonList.results);
domManager.handlePagination(pokemonList);

// listeners
document.getElementById("searchInput").addEventListener("search",async function(event){
    const value = event.target.value || "";
    if(!value.trim()){
        await domManager.printPage(1, pokemonList.results);
        document.getElementById("pagination").style.display = "flex";
    }
    event.target.scrollIntoView()
})

document.getElementById("searchForm").
    addEventListener("submit", async (event) => { 
        event.preventDefault();
        domManager.searchPokemon();
     });
