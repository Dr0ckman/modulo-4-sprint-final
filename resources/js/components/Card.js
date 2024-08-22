import { Modal } from "./Modal.js";

class Card {
    #wrapper;
    #pokemonName;
    #pokemonData;

    /**
     * Representa una tarjeta de bootstrap.
     * 
     * @param {string} pokemonData 
     * @param {string} spriteUrl 
     */
    constructor(pokemonData) {
        this.#wrapper = document.getElementById("cardContainer");
        this.#pokemonName = pokemonData.name;
        this.#pokemonData = pokemonData;
    }

    /**
     * Agrega una tarjeta a this.#wrapper.
     */
    appendCard(spriteUrl) {
        const cardHTML = `
        <div class="card mx-auto">
            <img src="${spriteUrl}" class="card-img-top">
            <div class="card-body bg-warning py-0">
                <h5 class="card-title text-center my-3 text-capitalize">${this.#pokemonName}</h5>
            </div>
        </div>
        `
        const cardElement = document.createElement("div");
        cardElement.className = "col-sm-6 col-lg-3 mb-3";
        cardElement.innerHTML = cardHTML;
        this.#wrapper.appendChild(cardElement);
        let modal = new Modal(this.#pokemonData);
        cardElement.addEventListener("click", () => {
            modal.show();
        });
    }

    appendCardSkeleton() {
        const cardHTML = `
        <div class="col-sm-6 col-lg-3 mb-3">
            <div class="card">
            <div class="placeholder-glow">
            <img class="card-img-top placeholder" height="286">
                <div class="card-body bg-warning py-0">
                    <h5 class="card-title text-center my-3 placeholder"></h5>
                </div>
            </div>
                
            </div>
        </div>
        `
        this.#wrapper.innerHTML += cardHTML;
    }
}

export { Card };