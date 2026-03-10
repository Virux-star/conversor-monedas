const montoInput = document.getElementById("monto");
const monedaSelect = document.getElementById("moneda");
const resultado = document.getElementById("resultado");
const boton = document.getElementById("convertir");

let chart;

async function convertirMoneda() {

    const monto = montoInput.value;
    const moneda = monedaSelect.value;

    if (monto === "" || monto <= 0) {
        resultado.innerText = "Ingresa un monto válido";
        return;
    }

    try {

        const res = await fetch(`https://mindicador.cl/api/${moneda}`);
        const data = await res.json();

        const valorActual = data.serie[0].valor;

        const conversion = monto / valorActual;

        resultado.innerText =
            monto + " CLP = " + conversion.toFixed(2) + " " + moneda.toUpperCase();

        generarGrafico(data.serie.slice(0,10));

    } catch (error) {

        resultado.innerText = "Error al obtener datos";

    }
}

function generarGrafico(data) {

    const labels = data.map(item =>
        new Date(item.fecha).toLocaleDateString("es-CL")
    );

    const valores = data.map(item => item.valor);

    const ctx = document.getElementById("grafico").getContext("2d");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Historial últimos días",
                data: valores,
                borderWidth: 2
            }]
        }
    });
}

boton.addEventListener("click", convertirMoneda);
 