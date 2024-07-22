const contenedorCarrito = document.getElementById("contenedor-cards");
const contenedorTotalCarrito = document.querySelector("#total-carrito");
let totalGeneral = 0;

const renderizarCarrito = () => {

  contenedorCarrito.innerHTML = "";
  totalGeneral = 0; // Reiniciar el total general al renderizar el carrito

  carrito.forEach(({ id, destino, precioPorPersona, cantidad }) => {
    const divCarrito = document.createElement("div");

    let totalPorExcursion = precioPorPersona * cantidad;
    totalGeneral += totalPorExcursion;


    divCarrito.innerHTML = `
            <div class="card-carrito">
            <p class="card-text-carrito">Cantidad: ${cantidad}</p>
            <p class="card-text-carrito">Excursión: ${destino}</p>
            <p class="card-text-carrito">Total: $ ${totalPorExcursion}</p>
            <a href="#" id="eliminar-${id}" class="btn btn-danger btn-carrito">Eliminar del carrito</a>
            `;

    // Agregar evento click al botón de eliminar
    const botonEliminar = divCarrito.querySelector(`#eliminar-${id}`);

    botonEliminar.addEventListener("click", (event) => {
      event.preventDefault();
      Swal.fire({
        title: "Estás seguro que deseas eliminar la excursión del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarDelCarrito(id);
          Swal.fire({
            title: "Eliminado!",
            text: "La excursión fue eliminada del carrito",
            icon: "success"
          });
        }
      });
    });

    contenedorCarrito.appendChild(divCarrito);
  })

  // Guardar el carrito en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Renderizar el total después de actualizar el carrito
  renderizarTotal();
}

const eliminarDelCarrito = (idExcursion) => {
  const index = carrito.findIndex(excursion => excursion.id === idExcursion);

  if (index !== -1) {
    carrito[index].cantidad > 1 ? carrito[index].cantidad-- : carrito.splice(index, 1);
  }

  // Renderizar nuevamente el carrito actualizado
  renderizarCarrito();

}

const renderizarTotal = () => {
  contenedorTotalCarrito.innerHTML = `
            <div class="card-header-total"> Resumen </div>
            <hr>
                <div class="total-compra">
                <span class="card-text-total"> Total: </span>
                <span class="card-text-total"> $ ${totalGeneral}</span>
                </div>
                <div class="buttons-total-compra">
                <a href= "../../index.html"><button type="button" class="btn btn-info btn-total">Seguir comprando</button></a>
                <button type="button" id="btn-finalizar-compra" class="btn btn-primary btn-total">Comprar</button>
                </div>
`;


  const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

  btnFinalizarCompra.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Está seguro de finalizar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, comprar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        //Vaciar el carrito luego de la compra
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();

        Swal.fire({
          title: "Compra realizada con éxito!",
          text: "Has finalizado la compra. Se te enviarán al mail las entradas correspondientes.",
          icon: "success"
        });
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});