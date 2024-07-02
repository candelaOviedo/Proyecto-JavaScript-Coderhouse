const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorTotalCarrito = document.getElementById("total-general");

const renderizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    let totalGeneral = 0;

    carrito.forEach(({ id, destino, precioPorPersona, cantidad }) => {
        const divCarrito = document.createElement("div");
        divCarrito.className = "card mb-3";

        let totalPorExcursion = precioPorPersona * cantidad;
        totalGeneral += totalPorExcursion;


        divCarrito.innerHTML = `
            <div class="card-header">
                Excursión: ${destino}
            </div>
            <div class="card-body">
                <h5 class="card-title">Total: $ ${totalPorExcursion} </h5>
                <p class="card-text">Cantidad: ${cantidad}</p>
            <a href="#" id="eliminar-${id}" class="btn btn-danger">Eliminar del carrito</a>
            `;

        // Agregar evento click al botón de eliminar
        const botonEliminar = divCarrito.querySelector(`#eliminar-${id}`);
        botonEliminar.addEventListener("click", (event) => {
            event.preventDefault();
            eliminarDelCarrito(id);
        });

        contenedorCarrito.appendChild(divCarrito);
    })


    contadorTotalCarrito.textContent = totalGeneral.toFixed(2);

    // Actualizar el localStorage con el nuevo estado del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const eliminarDelCarrito = (idExcursion) => {
    const index = carrito.findIndex(excursion => excursion.id === idExcursion);

    if (index !== -1) {
        carrito[index].cantidad > 1 ? carrito[index].cantidad-- : carrito.splice(index, 1);
    }

    // Renderizar nuevamente el carrito actualizado
    renderizarCarrito();

}


renderizarCarrito();
