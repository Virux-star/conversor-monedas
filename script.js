const montoInput = document.getElementById("monto");
const monedaSelect = document.getElementById("moneda");
const resultado = document.getElementById("resultado");
const boton = document.getElementById("convertir");

async function convertirMoneda() {

    const monto = montoInput.value;
    const moneda = monedaSelect.value;

    if (monto === "" || monto <= 0) {
        resultado.innerText = "Ingresa un monto válido";
        return;
    }

    try {

        const res = await fetch("https://mindicador.cl/api/");
        const data = await res.json();

        const valor = data[moneda].valor;

        const conversion = monto / valor;

        resultado.innerText =
            monto + " CLP = " + conversion.toFixed(2) + " " + moneda.toUpperCase();

    } catch (error) {

        resultado.innerText = "Error al obtener los datos";

    }
}

boton.addEventListener("click", convertirMoneda);