class PokeAPI {
    #pokemonList;

    get pokemonList() {
        return this.#pokemonList;
    }

    /**
     * Hace un fetch de la lista de los pokemon en PokeApi.
     * Hace un cache de la data en localStorage.
     * @returns {json}
     */
    async fetchPokemonList() {
        if (localStorage.getItem("pokemonList")) {
            this.#pokemonList = JSON.parse(localStorage.getItem("pokemonList"));
            return this.#pokemonList
        }

        const url = "https://pokeapi.co/api/v2/pokemon/?limit=2000&offset=0";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            this.#pokemonList = await response.json();
            this.#cacheData();

            return this.#pokemonList;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Hace un fetch de la info de un pokemon.
     * @param {string} url - Se obtiene de this.fetchPokemonList()
     * @returns {json}
     */
    async fetchPokemon(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const pokemon = await response.json();
            return pokemon;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Hace un fetch de la info de la especie de un pokemon.
     * @param {string} name 
     * @returns {json}
     */
    async fetchPokemonSpecies (name) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            const pokemonSpecies = await response.json();
            return pokemonSpecies;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Guarda #pokemonList en localStorage.
     * 
     * Debido a una particularidad con la implementación de localStorage,
     * hay que usar JSON.stringify() para guardar objetos.
     * 
     * @returns { json }
     */
    #cacheData() {
        localStorage.setItem("pokemonList", JSON.stringify(this.#pokemonList));
        return JSON.parse(localStorage.getItem("pokemonList"));
    }
}

export { PokeAPI };