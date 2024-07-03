let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorExcursiones = document.getElementById('excursiones-contenedor');

const mostrarExcursiones = () => {
    excursiones.forEach(excursion => {
        const div = document.createElement('div');
        div.className = "card text-center";

        const { id, destino, descripcion, precioPorPersona } = excursion;

        div.innerHTML = `
        <img src="${excursion.img}" class="card-img-top card-image" alt="${destino}">
        <div class="card-body">
        <h5 class="card-title"> ${destino} </h5>
        <p class="card-text "> ${descripcion} </p>
        <p class="card-text">Precio por persona: $ ${precioPorPersona} </p>
        <p>Excursiones reservadas: <span id="cantidad-${id}"> 0 </span></p>
        <div id="liveAlertPlaceholder-${id}">
        </div>
        <a href="#" id="agregar-${id}" class="btn btn-primary">Agregar al carrito</a>
        </div>
`;
        contenedorExcursiones.appendChild(div);

        // Evento click para renderizar alert de bootstrap
        const btnAgregar = div.querySelector(`#agregar-${id}`);
        btnAgregar.addEventListener('click', () => {
            alertAgregarCarrito(`Agregaste la excursión ${destino} al carrito`, 'success', `liveAlertPlaceholder-${id}`);
        });
    });
};


if (window.location.pathname === '/index.html' || window.location.pathname === '/') {

    mostrarExcursiones();

    // Event listener para agregar excursiones al carrito al hacer click en botón
    contenedorExcursiones.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-primary")) {
            event.preventDefault();
            const id = event.target.id.split('-')[1];
            const excursionSeleccionada = excursiones.find(excursion => excursion.id === parseInt(id));
            agregarAlCarrito(excursionSeleccionada);
        }
    });

    function agregarAlCarrito(excursion) {
        const excursionEnCarrito = carrito.find(item => item.id === excursion.id);

        // Operador ternario para incrementar cantidad o agregar nueva excursión
        excursionEnCarrito ? excursionEnCarrito.cantidad++ : carrito.push({ ...excursion, cantidad: 1 });

        // Actualizar el localStorage con el nuevo estado del carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

// alert para confirmar producto agregado al carrito
const alertAgregarCarrito = (mensaje, tipo, placeholderId) => {
    const alertPlaceholder = document.getElementById(placeholderId);
    if (!alertPlaceholder) return;

    const divAlert = document.createElement('div');
    divAlert.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertPlaceholder.appendChild(divAlert);

    setTimeout(() => {
        divAlert.remove();
    }, 2000);
};


