class Modal {
    #title;
    #content;

    /**
     * Representa un modal.
     * @param {string} title 
     * @param {string} content 
     */
    constructor(title, content) {
        this.#title = title;
        this.#content = content;
    }

    /**
     * Inserta el modal en el DOM y reemplaza los campos según sea necesario.
     * 
     * Luego lo muestra.
     */
    show() {
        const wrapper = document.getElementById("modalWrapper");
        const modalHTML = `
            <div class="modal" tabindex="-1" id="modalPokemon">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${this.#title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${this.#content}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        wrapper.innerHTML = modalHTML;

        const bsModal = new bootstrap.Modal('#modalPokemon', {
            focus: true
        });

        bsModal.show();
    }
}

export { Modal };