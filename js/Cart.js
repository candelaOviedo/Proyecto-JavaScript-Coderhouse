let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorCarrito = document.getElementById("carrito-contenedor");

const renderizarCarrito = () => {

    contenedorCarrito.innerHTML = "";


    carrito.forEach(excursion => {
        const divCarrito = document.createElement("div");
        divCarrito.className = "card mb-3";

        let totalPorExcursion = + excursion.precioPorPersona * excursion.cantidad;

        divCarrito.innerHTML = `
            <div class="card-header">
                Excursión: ${excursion.destino}
            </div>
            <div class="card-body">
                <h5 class="card-title">Total: $ ${totalPorExcursion} </h5>
                <p class="card-text">Cantidad: ${excursion.cantidad}</p>
            <a href="#" id="eliminar-${excursion.id}" class="btn btn-danger">Eliminar del carrito</a>

            `;

        // Agregar evento click al botón de eliminar
        const botonEliminar = divCarrito.querySelector(`#eliminar-${excursion.id}`);
        botonEliminar.addEventListener("click", (event) => {
            event.preventDefault();
            eliminarDelCarrito(excursion.id);
        });

        contenedorCarrito.appendChild(divCarrito);
    })

}

const eliminarDelCarrito = (idExcursion) => {
    // Encontrar la primera instancia de la excursión con el id dado
    const index = carrito.findIndex(excursion => excursion.id === idExcursion);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
    }

    // Renderizar nuevamente el carrito actualizado
    renderizarCarrito();

    // Actualizar el localStorage con el nuevo estado del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

renderizarCarrito();
