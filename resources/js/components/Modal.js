import { PokeAPI } from "../PokeAPI.js";

class Modal {
    #pokemonData

    /**
     * Representa un modal.
     * @param {string} title 
     * @param {string} content 
     */
    constructor(pokemonData) {
        this.#pokemonData = pokemonData;
    }

    async fetchFlavorData() {
        const pokeApi = new PokeAPI();
        const pokemonSpecies = await pokeApi.fetchPokemonSpecies(this.#pokemonData.name);
                let flavorText = "";

                for (let entry of pokemonSpecies.flavor_text_entries) {
                    if (entry.language.name === "en") {
                        flavorText = entry.flavor_text;
                        break
                    }
                }
                return flavorText
    }
    /**
     * Inserta el modal en el DOM y reemplaza los campos según sea necesario.
     * 
     * Luego lo muestra.
     */
    async show() {
        const wrapper = document.getElementById("modalWrapper");
        const modalHTML = `
            <div class="modal" tabindex="-1" id="modalPokemon">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-capitalize">${this.#pokemonData.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${await this.fetchFlavorData()}</p>
                            <canvas id="chartCanvas"></canvas>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        wrapper.innerHTML = modalHTML;
        // gráfico
        const ctx = document.getElementById("chartCanvas");
        const graphData = this.#pokemonData.stats.map(stat => ({label: stat.stat.name.replaceAll("-", " "), value:stat.base_stat}))

        // Por hacer: sacar esta data de PokeAPI.
        const data = {
            labels: graphData.map(data => data.label),
            datasets: [{
                label: 'Stats',
                data: graphData.map(data => data.value),
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

// open modal
        const bsModal = new bootstrap.Modal('#modalPokemon', {
            focus: true
        });

        bsModal.show();
    }
}

export { Modal };