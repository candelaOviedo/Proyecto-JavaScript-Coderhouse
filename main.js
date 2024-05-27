let destino = "";
let mes = "";
let dia = 0;
let cantidadPersonas = 0;
let precioPorPersona = 0;
let totalCompra = 0;
let seguirComprando = false;

const comprarExcursion = () => {
    do {
        destino = prompt("Indique la excursión que desea realizar: Tour a Purmamarca - Tour a Cafayate - Tour a Tilcara", "Tour a Purmamarca").toLowerCase();
        destino = validarDestino (destino);

        mes = prompt("En qué mes del 2024 desea realizar la excursión?").toLowerCase();
        mes = validarMes (mes);

        dia = parseInt(prompt("Qué día desea hacerla?"));
        dia = validarDia (dia);


        cantidadPersonas = parseInt(prompt("Cuántas personas van a realizar la excursión?"));
        let cantidadValidadaPersonas = validarCantidadPersonas(cantidadPersonas);

        let cantidadMenores = 0;
        if (confirm("¿Hay algún menor de edad? Los menores tienen un 40% de descuento en todas las excursiones.")) {
            cantidadMenores = validarCantidadMenores (cantidadValidadaPersonas);
        }

            switch (destino) {
                case "tour a purmamarca":
                    precioPorPersona = 30000;
                    break;
                case "tour a cafayate":
                    precioPorPersona = 35000;
                    break;
                case "tour a tilcara":
                    precioPorPersona = 25000;
                    break;
                default:
                    alert("No existe la excursión indicada");
                    precioPorPersona = 0;
                    cantidadPersonas = 0;
                    break;
            }

            let precioConDescuento = aplicarDescuentoMenoresDeEdad (cantidadMenores, precioPorPersona);

        totalCompra += (precioPorPersona * (cantidadValidadaPersonas - cantidadMenores)) + precioConDescuento;

        seguirComprando = confirm("¿Desea realizar otra excursión?");

    } while (seguirComprando)

    alert("El total de su compra es: $" + totalCompra);
}

const validarDestino = (destino) => {
    while (destino === "" || (destino != "tour a purmamarca" && destino != "tour a cafayate" && destino != "tour a tilcara")){
        alert("Debe ingresar un destino válido");
        destino = prompt("Indique la excursión que desea realizar: Tour a Purmamarca - Tour a Cafayate - Tour a Tilcara", "Tour a Purmamarca").toLowerCase();
    }
    return destino;
}

const validarMes = (mes) => {
    while (mes === "" || (mes!= "enero" && mes!= "febrero" && mes!= "marzo" && mes!= "abril" && mes!= "mayo" && mes!= "junio" && mes!= "julio" && mes!= "agosto" && mes!= "septiembre" && mes!= "octubre" && mes!= "noviembre" && mes!= "diciembre")) {
        alert("Debe ingresar un mes válido");
        mes = prompt("En qué mes del 2024 desea realizar la excursión?").toLowerCase();
    }
    return mes;
}

const validarDia = (dia) => {
    while (true){
        if ( ((mes === "enero" || mes === "marzo" || mes === "mayo" || mes === "julio" || mes === "agosto" || mes === "octubre" || mes === "diciembre") && (isNaN(dia) || dia < 1 || dia > 31)) ){
            alert("El día ingresado no es válido. El mes de " + mes + " tiene 31 días.");
            dia = parseInt(prompt("Qué día desea hacerla?"));
        } else if (((mes === "abril" || mes === "junio" || mes === "septiembre" || mes === "noviembre") && (isNaN(dia) || dia < 1 || dia > 30))){
            alert("El día ingresado no es válido. El mes de " + mes + " tiene 30 días");
        } else if ( (mes === "febrero" && (isNaN(dia) || dia < 1 || dia > 29))){
            alert ("El día ingresado no es válido. El mes de " + mes + " tiene 29 días");
        } else {
            break;
        }
        dia = parseInt(prompt("Qué día desea hacerla?"));
    }
    return dia;
}

const validarCantidadPersonas = (cantidadPersonas) => {
    while (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
        alert("Debe ingresar una cantidad válida de personas");
        cantidadPersonas = parseInt(prompt("Cuántas personas van a realizar la excursión?"));
    }
    return cantidadPersonas;
}

const validarCantidadMenores = (cantidadValidadaPersonas) => {
    while (true) {
        cantidadMenores = parseInt(prompt("Cuántas personas son menores de edad?"));
        if(isNaN(cantidadMenores) || cantidadMenores < 1) {
            alert ("Debe ingresar un número válido.");
        } else if (cantidadMenores > cantidadValidadaPersonas){
            alert ("La cantidad de menores ingresada no puede ser mayor que la cantidad total de personas.");
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
