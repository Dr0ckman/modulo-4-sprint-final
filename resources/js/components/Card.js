import { PokeAPI } from "../PokeAPI.js";

class Card {
    #wrapper;
    #pokemonName;
    #spriteUrl;

    /**
     * Representa una tarjeta de bootstrap.
     * 
     * @param {string} pokemonName 
     * @param {string} spriteUrl 
     */
    constructor(pokemonName, spriteUrl) {
        this.#wrapper = document.getElementById("cardContainer");
        this.#pokemonName = pokemonName;
        this.#spriteUrl = spriteUrl;
    }

    /**
     * Agrega una tarjeta a this.#wrapper.
     */
    appendCard() {
        const cardHTML = `
        <div class="col-sm-6 col-lg mb-3">
            <div class="card" style="width: 18rem;">
                <img src="${this.#spriteUrl}" class="card-img-top">
                <div class="card-body bg-warning py-0">
                    <h5 class="card-title text-center my-3">${this.#pokemonName}</h5>
                </div>
            </div>
        </div>
        `
        this.#wrapper.innerHTML += cardHTML;
    }
}

export { Card };