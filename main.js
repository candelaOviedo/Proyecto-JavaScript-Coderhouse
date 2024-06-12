let destino = "";
let mes = "";
let dia = 0;
let cantidadPersonas = 0;
let cantidadMenores = 0;
let precioPorPersona = 0;
let totalCompra = 0;
let seguirComprando = false;
let excursion = "";
const mesesCon31Dias = ["enero", "marzo", "mayo", "julio", "agosto", "octubre", "diciembre"];
const mesesCon30Dias= ["abril", "junio", "septiembre", "setiembre", "noviembre"];
const carrito = [];

const todosLosMeses = mesesCon31Dias.concat (mesesCon30Dias);
todosLosMeses.push ("febrero");

const excursiones = [
    {
        id: 1,
        destino: "Tour a Purmamarca",
        descripcion: "Embárcate en un viaje inolvidable a Purmamarca, un encantador pueblo en la Quebrada de Humahuaca, Patrimonio de la Humanidad por la UNESCO. Maravíllate con el icónico Cerro de los Siete Colores, pasea por sus pintorescas calles y visita la histórica iglesia de Santa Rosa de Lima. Disfruta de la cultura local en el mercado artesanal y explora el impresionante Paseo de los Colorados. Experimenta la auténtica esencia del norte argentino en Purmamarca",
        precioPorPersona: 45000,
        cantidadPersonas: 1
    },
    {
        id: 2,
        destino: "Tour a Cafayate",
        descripcion: "Embárcate en una aventura inolvidable por un pintoresco pueblo situado en el corazón de los Valles Calchaquíes. Famoso por sus paisajes deslumbrantes y sus vinos de alta calidad, especialmente el Torrontés, Cafayate es el destino perfecto para los amantes de la naturaleza y la enología.",
        precioPorPersona: 55000,
        cantidadPersonas: 1
    },
    {
        id: 3,
        destino: "Tour a Puerto Madryn",
        descripcion: "Embárcate en una emocionante aventura a Puerto Madryn, un destino único en Argentina, conocido por su impresionante belleza natural y su vida marina abundante, que incluye la fascinante presencia de ballenas francas australes durante su temporada de avistaje. Descubre la magia de este pintoresco pueblo, donde el mar y la tierra se encuentran en armonía para ofrecerte experiencias inolvidables.",
        precioPorPersona: 58000,
        cantidadPersonas: 1
    },
    {
        id: 4,
        destino: "Cataratas del Iguazú",
        descripcion: "Embárcate en una aventura inolvidable y descubre la majestuosa belleza de las Cataratas del Iguazú, un destino que te dejará sin aliento. Situadas en la frontera entre Argentina y Brasil, estas impresionantes cascadas han sido declaradas Patrimonio de la Humanidad por la UNESCO y son consideradas una de las Siete Maravillas Naturales del Mundo.",
        precioPorPersona: 50000,
        cantidadPersonas: 1
    },
    {
        id: 5,
        destino: "Tour a Bariloche",
        descripcion: "Descubre el corazón de la Patagonia argentina, un destino que combina paisajes de ensueño, aventuras emocionantes y una rica cultura local. Situada a orillas del majestuoso Lago Nahuel Huapi y rodeada por los imponentes Andes, Bariloche es el lugar perfecto para los amantes de la naturaleza y las actividades al aire libre.",
        precioPorPersona: 60000,
        cantidadPersonas: 1
    },
    {
        id: 6,
        destino: "Glaciar Perito Moreno",
        descripcion: "Embárcate en una aventura inolvidable al Glaciar Perito Moreno, uno de los tesoros más impresionantes de la Patagonia argentina. Situado en el Parque Nacional Los Glaciares, este colosal glaciar es famoso por su majestuosidad, sus espectaculares rupturas y su accesibilidad única, permitiéndote experimentar de cerca la maravilla de la naturaleza en su estado más puro.",
        precioPorPersona: 58000,
        cantidadPersonas: 1
    },
    {
        id: 7,
        destino: "Tour a Mendoza",
        descripcion: "Embárcate en una aventura inolvidable al Glaciar Perito Moreno, uno de los tesoros más impresionantes de la Patagonia argentina. Situado en el Parque Nacional Los Glaciares, este colosal glaciar es famoso por su majestuosidad, sus espectaculares rupturas y su accesibilidad única, permitiéndote experimentar de cerca la maravilla de la naturaleza en su estado más puro.",
        precioPorPersona: 53000,
        cantidadPersonas: 1
    },
    {
        id: 8,
        destino: "Tour a Córdoba",
        descripcion: "Embárcate en una aventura inolvidable al Glaciar Perito Moreno, uno de los tesoros más impresionantes de la Patagonia argentina. Situado en el Parque Nacional Los Glaciares, este colosal glaciar es famoso por su majestuosidad, sus espectaculares rupturas y su accesibilidad única, permitiéndote experimentar de cerca la maravilla de la naturaleza en su estado más puro.",
        precioPorPersona: 48000,
        cantidadPersonas: 1
    }
];


const comprarExcursion = () => {
    mostrarExcursionesPorPrecio (ordenarExcursionesPorPrecio(excursiones));
    do {
        const excursion = validarDestino();

        mes = prompt("En qué mes del 2024 desea realizar la excursión?", "Enero").toLowerCase();
        mes = validarMes(mes);

        dia = parseInt(prompt("Qué día de " + mes + " desea hacer la excursión?", "4"));
        dia = validarCantidadDias(dia, mes);


        cantidadPersonas = parseInt(prompt("Cuántas personas van a realizar la excursión?", "2"));
        let cantidadValidadaPersonas = validarCantidadPersonas(cantidadPersonas);

        if (confirm("¿Hay algún menor de edad? Los menores tienen un 40% de descuento en todas las excursiones.")) {
            cantidadMenores = validarCantidadMenores(cantidadValidadaPersonas);
        }

        let precioPorPersona = excursion.precioPorPersona;

        let precioConDescuento = aplicarDescuentoMenoresDeEdad(cantidadMenores, precioPorPersona);

        totalCompra += (precioPorPersona * (cantidadValidadaPersonas - cantidadMenores)) + precioConDescuento;

        agregarAlCarrito(excursion, cantidadValidadaPersonas, totalCompra, cantidadMenores, precioConDescuento);

        seguirComprando = confirm("¿Desea realizar otra excursión?");

    } while (seguirComprando)

        mostrarResumenCompra();
};

const agregarAlCarrito = (excursion, cantidadValidadaPersonas, totalCompra,cantidadMenores, precioConDescuento) => {
    carrito.push ({
        destino: excursion.destino,
        cantidadPersonas: cantidadValidadaPersonas,
        precioTotal: totalCompra,
        cantidadMenores: cantidadMenores,
        descuentoMenores: precioConDescuento
    });
};

const mostrarResumenCompra = () => {
    let resumenCompra = "Resumen de la compra:\n";

    carrito.forEach(item => {
        resumenCompra += "Excursión: " + item.destino + ", Cantidad de personas: " + item.cantidadPersonas + "\n";
    });
    resumenCompra += "Total en pesos: $" + totalCompra;
    alert(resumenCompra);
};

const obtenerExcursionPorNombre = (nombre) => {
    return excursiones.find(excursion => excursion.destino.toLowerCase() === nombre.toLowerCase());
};

const validarDestino = () => {
    while (true) {
        destino = prompt("Indique la excursión que desea realizar: Tour a Purmamarca - Tour a Cafayate - Tour a Tilcara", "Tour a Purmamarca").toLowerCase();
        excursion = obtenerExcursionPorNombre(destino);
        if (excursion) {
            precioPorPersona = excursion.precioPorPersona;
            break;
        } else {
            alert("No existe la excursión indicada");
        }
    }
    return excursion;
};

const ordenarExcursionesPorPrecio = (excursiones) => {
    return excursiones.sort((a, b) => a.precioPorPersona - b.precioPorPersona);
};

const mostrarExcursionesPorPrecio = (excursiones) => {
    alert("Excursiones disponibles:\n" + excursiones.map(excursion => "Destino: " + excursion.destino + ", Precio por persona: " + excursion.precioPorPersona).join("\n"));
};


const validarCantidadDias = (dia, mes) => {
    let maxDias;
    if (mesesCon31Dias.includes(mes)) {
        maxDias = 31;
    } else if (mesesCon30Dias.includes(mes)) {
        maxDias = 30;
    } else {
        maxDias = 29; // Febrero en 2024 es bisiesto
    }

    while (isNaN(dia) || dia < 1 || dia > maxDias) {
        alert("El día ingresado no es válido. El mes de " + mes + " tiene " + maxDias + " días.");
        dia = parseInt(prompt("Qué día de " + mes + " desea hacer la excursión?", "4"));
    }
    return dia;
};


const esMesValido = (mes) => todosLosMeses.includes(mes.toLowerCase());

const validarMes = (mes) => {
    while (mes === "" || !esMesValido(mes)) {
        alert("Debe ingresar un mes válido");
        mes = prompt("En qué mes del 2024 desea realizar la excursión?", "Enero").toLowerCase();
    }
    return mes;
};

const validarCantidadPersonas = (cantidadPersonas) => {
    while (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
        alert("Debe ingresar una cantidad válida de personas");
        cantidadPersonas = parseInt(prompt("Cuántas personas van a realizar la excursión?", "2"));
    }
    return cantidadPersonas;
};

const validarCantidadMenores = (cantidadValidadaPersonas) => {
    while (true) {
        cantidadMenores = parseInt(prompt("Cuántas personas son menores de edad?", "1"));
        if (isNaN(cantidadMenores) || cantidadMenores < 1) {
            alert("Debe ingresar un número válido.");
        } else if (cantidadMenores > cantidadValidadaPersonas) {
            alert("La cantidad de menores ingresada no puede ser mayor que la cantidad total de personas.");
        } else {
            break;
        }
    }
    return cantidadMenores;
};

const aplicarDescuentoMenoresDeEdad = (cantidadMenores, precioPorPersona) => {
    const descuentoPorMenor = 0.6; //Descuento del 40% por menor
    return cantidadMenores * precioPorPersona * descuentoPorMenor;
};


comprarExcursion();
