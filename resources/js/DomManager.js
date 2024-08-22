import { Card } from "./components/Card.js";

class DomManager {
    #pokeApi;

    /**
     * Se encarga de la actualización del DOM.
     * @param {PokeAPI} pokeAPI 
     */
    constructor(pokeAPI) {
        this.#pokeApi = pokeAPI;
    }

    /**
     * Maneja la paginación de las tarjetas.
     * 
     * Deshabilita y habilita botones y actualiza el número de página actual.
     * @param {*} pokemonList 
     */
    handlePagination(pokemonList) {
        let currentPage = 1;

        document.getElementById("previousPage")
            .addEventListener("click", async () => {
                currentPage--;
                if (currentPage === 1) {
                    document.getElementById("previousPage").parentElement.classList.add("disabled");
                }
                document.getElementById("nextPage").parentElement.classList.remove("disabled");
                document.getElementById("currentPage").innerHTML = currentPage;
                await this.printPage(currentPage, pokemonList.results);
            })

        document.getElementById("nextPage")
            .addEventListener("click", async () => {
                currentPage++;
                if (currentPage === Math.ceil(pokemonList.results.length / 20)) {
                    document.getElementById("nextPage").parentElement.classList.add("disabled");
                }
                document.getElementById("previousPage").parentElement.classList.remove("disabled");
                document.getElementById("currentPage").innerHTML = currentPage;
                await this.printPage(currentPage, pokemonList.results);
            })
    }

    async searchPokemon() {
        const searchInput = document.getElementById("searchInput");

        let searchResult = await this.#pokeApi.fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${searchInput.value}`);

        if (searchInput.value === "") {
            await this.printPage(1, this.#pokeApi.pokemonList.results);
            document.getElementById("pagination").style.display = "flex";
        } else {
            try {
                await this.printPage(1, [searchResult]);
            } catch (error) {
                const cardWrapper = document.getElementById("cardContainer");
                cardWrapper.innerHTML = "Pokemon no encontrado";
            }
            document.getElementById("pagination").style.display = "none";
        }
    }

    /**
     * Muestra las tarjetas en pantalla.
     * 
     * Por hacer: mover el ciclo for a otro lado.
     * Al final no mostramos la descripción del pokemon en la tarjeta. Es demasiado lento.
     * @param {number} page - Número de página a mostrar. 
     * @param {json} pokemonList - Lista de Pokemon. Obtenida de PokeAPI inicialmente.
     * Luego se obtiene del filtro.
     */
    async printPage(page, pokemonList) {
        const cardWrapper = document.getElementById("cardContainer");
        cardWrapper.innerHTML = "";
        for (let i = 0; i <= 20; i++) {
            let card = new Card("");
            card.appendCardSkeleton();
        }

        let pokemonsData;
        if (pokemonList.length > 1) {
            const pokemonToFetch = pokemonList.slice(20 * (page - 1), 20 * page).map(pokemonData => this.#pokeApi.fetchPokemon(pokemonData.url))
            pokemonsData = await Promise.all(pokemonToFetch)
        } else {
            pokemonsData = pokemonList;
        }

        cardWrapper.innerHTML = "";

        for (let pokemon of pokemonsData) {
            const sprite = pokemon.sprites.front_default;

            let card = new Card(pokemon);
            card.appendCard(sprite);
        }
        cardWrapper.scrollIntoView({ block: 'center' });
    }
}

export { DomManager };