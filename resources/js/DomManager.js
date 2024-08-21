import { Utils } from "./Utils.js";
import { Card } from "./components/Card.js";
import { Modal } from "./components/Modal.js";

class DomManager {
    #utils;
    #pokeApi;
    #currentSearchMode;

    /**
     * Se encarga de la actualización del DOM.
     * @param {PokeAPI} pokeAPI 
     */
    constructor(pokeAPI) {
        this.#utils = new Utils();
        this.#pokeApi = pokeAPI;
        this.#currentSearchMode = "id";
    }

    /**
     * Selecciona los botones de filtro.
     */
    #handleClickingNav() {
        const searchSelector = document.getElementById("searchSelector");
        for (let li of searchSelector.children) {
            const button = li.firstElementChild;
            button.addEventListener("click", () => {
                for (let li of searchSelector.children) {
                    const button = li.firstElementChild;
                    button.classList.remove("active");
                }
                if (!button.classList.contains("active")) {
                    button.classList.add("active");
                    this.#currentSearchMode = button.value;
                }
            });
        }
    }

    /**
     * Se gatilla al clickear en una tarjeta.
     * 
     * Muestra un modal de acuerdo al pokemon clickeado.
     */
    #handleClickingCard() {
        let cards = document.getElementsByClassName("card");
        for (let card of cards) {
            card.addEventListener("click", () => {
                const cardTitle = card.getElementsByClassName("card-title")[0].innerHTML;
                const modal = new Modal(cardTitle, `Lorem ipsum dolor sit amet 
                    consectetur adipisicing elit. 
                    Repudiandae illum quae corporis porro quibusdam 
                    vero at voluptate ex rerum voluptatum numquam
                    voluptas doloremque qui ut, dolore officiis dicta, 
                    soluta dolorum.`);
                modal.show();
                // El gráfico se inserta luego de mostrar el modal.
                // Hacerlo de cualquier otra forma no funciona, porque técnicamente
                // el modal aún no existe en el DOM.
                const ctx = document.getElementById("chartCanvas");

                // Por hacer: sacar esta data de PokeAPI.
                const data = {
                    labels: [
                        'Eating',
                        'Drinking',
                        'Sleeping',
                        'Designing',
                        'Coding',
                        'Cycling',
                        'Running'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 90, 81, 56, 55, 40],
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }]
                };

                new Chart(ctx, {
                    type: 'radar',
                    data: data,
                    options: {
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        }
                    },
                });
            })
        }
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
                await this.printPage(currentPage, pokemonList);
            })

        document.getElementById("nextPage")
            .addEventListener("click", async () => {
                currentPage++;
                if (currentPage === Math.ceil(pokemonList.results.length / 20)) {
                    document.getElementById("nextPage").parentElement.classList.add("disabled");
                }
                document.getElementById("previousPage").parentElement.classList.remove("disabled");
                document.getElementById("currentPage").innerHTML = currentPage;
                await this.printPage(currentPage, pokemonList);
            })
    }

    searchPokemon() {
        const searchButton = document.getElementById("searchButton");
        searchButton.addEventListener("click", async () => {
            let searchResult = [];
            if (this.#currentSearchMode === "id") {
                // Buscar por ID
                searchResult = [];
                await this.printPage(1, searchResult);
            } else {
                // Buscar de forma masiva
                searchResult = [];
                await this.printPage(1, searchResult);
            }
        })
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
        for (let pokemon of pokemonList.results.slice(20 * (page - 1), 20 * page)) {
            const pokemonData = await this.#pokeApi.fetchPokemon(pokemon.url);
            const sprite = pokemonData.sprites.front_default;
            // const pokemonSpecies = await this.#pokeApi.fetchPokemonSpecies(pokemon.name);
            // let flavorText = "";

            // for (let entry of pokemonSpecies.flavor_text_entries) {
            //     if (entry.language.name === "en") {
            //         flavorText = entry.flavor_text;
            //         break
            //     }
            // }

            let card = new Card(this.#utils.capitalizeFirstLetter(pokemon.name), sprite);
            card.appendCard();
        }
        this.#handleClickingCard();
        this.#handleClickingNav();
    }
}

export { DomManager };