let destino = "";
let mes = "";
let dia = 0;
let cantidadPersonas = 0;
let precioPorPersona = 0;
let totalCompra = 0;
let seguirComprando = false;
let excursion = "";

const excursiones = [
    {
        id: 1,
        destino: "Tour a Purmamarca",
        descripcion: "algo del tour",
        precioPorPersona: 30000,
        cantidadPersonas: 1
    },
    {
        id: 2,
        destino: "Tour a Cafayate",
        descripcion: "algo del tour",
        precioPorPersona: 35000,
        cantidadPersonas: 1
    },
    {
        id: 3,
        destino: "Tour a Tilcara",
        descripcion: "algo del tour",
        precioPorPersona: 25000,
        cantidadPersonas: 1
    }
]

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


const comprarExcursion = () => {
    do {
        validarDestino();

        mes = prompt("En qué mes del 2024 desea realizar la excursión?", "Enero").toLowerCase();
        mes = validarMes(mes);

        dia = parseInt(prompt("Qué día de " + mes + " desea hacer la excursión?", "4"));
        dia = validarDia(dia, mes);


        cantidadPersonas = parseInt(prompt("Cuántas personas van a realizar la excursión?", "2"));
        let cantidadValidadaPersonas = validarCantidadPersonas(cantidadPersonas);

        let cantidadMenores = 0;
        if (confirm("¿Hay algún menor de edad? Los menores tienen un 40% de descuento en todas las excursiones.")) {
            cantidadMenores = validarCantidadMenores(cantidadValidadaPersonas);
        }


        let precioConDescuento = aplicarDescuentoMenoresDeEdad(cantidadMenores, precioPorPersona);

        totalCompra += (precioPorPersona * (cantidadValidadaPersonas - cantidadMenores)) + precioConDescuento;

        seguirComprando = confirm("¿Desea realizar otra excursión?");

    } while (seguirComprando)

    alert("El total de su compra es: $" + totalCompra);
}

const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "setiembre", "octubre", "noviembre", "diciembre"];
const validarMes = (mes) => {
    while (mes === "" || !meses.includes(mes.toLowerCase())) {
        alert("Debe ingresar un mes válido");
        mes = prompt("En qué mes del 2024 desea realizar la excursión?", "Enero").toLowerCase();
    }
    return mes;
}

const mesesCon31Dias = ["enero", "marzo", "mayo", "julio", "agosto", "octubre", "diciembre"]
const mesesCon30Dias= ["abril", "junio", "septiembre", "setiembre", "noviembre"]
const validarDia = (dia, mes) => {
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
}

const validarCantidadPersonas = (cantidadPersonas) => {
    while (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
        alert("Debe ingresar una cantidad válida de personas");
        cantidadPersonas = parseInt(prompt("Cuántas personas van a realizar la excursión?", "2"));
    }
    return cantidadPersonas;
}

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
}

const aplicarDescuentoMenoresDeEdad = (cantidadMenores, precioPorPersona) => {
    const descuentoPorMenor = 0.6; //Descuento del 40% por menor
    return cantidadMenores * precioPorPersona * descuentoPorMenor;
}


comprarExcursion();
