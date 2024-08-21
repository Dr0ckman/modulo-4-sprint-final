import { DomManager } from "./DomManager.js";
import { PokeAPI } from "./PokeAPI.js";

const pokeApi = new PokeAPI();
const pokemonList = pokeApi.pokemonList;
const domManager = new DomManager(pokeApi);

await domManager.printPage(1, pokemonList);
domManager.handlePagination(pokemonList);
