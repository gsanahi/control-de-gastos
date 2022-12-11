let transacciones = [];
let id = 1;

function nuevaTransaccion() {
    const concepto = document.getElementById("concepto-transaccion").value;
    const importe = Number(document.getElementById("importe-transaccion").value);

    // Valido que los datos sean correctos
    if (!concepto || !importe) {
        return;
    }

    const transaccion = { id, concepto, importe, fecha: new Date().toLocaleDateString() };
    transacciones.push(transaccion);
    id++;

    agregarElementoTransaccion(transaccion);
    
    actualizarControlGastos();
    guardarTransacciones()
}

function eliminarTransaccion(id) {
    transacciones = transacciones.filter(transaccion => transaccion.id !== id);
    document.getElementById(`transaccion-${id}`).remove();
    
    actualizarControlGastos();
    guardarTransacciones()
}

function actualizarControlGastos() {
    const ingresos = transacciones
            .map(transaccion => transaccion.importe)
            .filter(importe => importe > 0)
            .reduce((acc, importe) => acc + importe, 0);

    const egresos = transacciones
            .map(transaccion => transaccion.importe)
            .filter(importe => importe < 0)
            .reduce((acc, importe) => acc + importe, 0);

    const ahorro = ingresos + egresos;

    document.getElementById("ingresos").innerText = ingresos;
    document.getElementById("egresos").innerText = egresos;
    document.getElementById("ahorro").innerText = ahorro;
}

function agregarElementoTransaccion(transaccion){
    const elementoTransaccion = document.createElement('div'); // <div></div>
    elementoTransaccion.className = "transaccion";
    elementoTransaccion.setAttribute("id", `transaccion-${transaccion.id}`)

    const elementoFecha = document.createElement('div');
    elementoFecha.className = "fecha";
    elementoFecha.innerText = transaccion.fecha;
    elementoTransaccion.appendChild(elementoFecha);

    const elementoImporte = document.createElement('div'); // <div></div>
    elementoImporte.className = "importe";
    elementoImporte.innerText = "€ " + transaccion.importe; // <div>214</div>
    if(transaccion.importe >= 0){
        elementoImporte.className += " positivo";
    } else {
        elementoImporte.className += " negativo";
    }
    elementoTransaccion.appendChild(elementoImporte); 

    const elementoConcepto = document.createElement('div'); // <div></div>
    elementoConcepto.className ="concepto";
    elementoConcepto.innerText = transaccion.concepto; // <div>Cine</div>
    elementoTransaccion.appendChild(elementoConcepto); // <div><div>214</div><div>Cine</div></div>

    const elementoAcciones = document.createElement('div'); // <div></div>
    elementoAcciones.className = "acciones"
    const elementoEliminar = document.createElement('button');
    elementoEliminar.innerText = 'X';
    elementoEliminar.onclick = () => eliminarTransaccion(transaccion.id)
    elementoAcciones.appendChild(elementoEliminar);
    elementoTransaccion.appendChild(elementoAcciones); // <div><div>214</div><div>Cine</div><div></div></div>

    document.getElementById("historial").appendChild(elementoTransaccion);


}

function guardarTransacciones() {
    const serializado = JSON.stringify(transacciones);
    window.localStorage.setItem("transacciones", serializado);
    window.localStorage.setItem("id", String(id));
}

function cargarTransacciones() {
    const serializado = window.localStorage.getItem("transacciones");
    if (serializado) {
        transacciones = JSON.parse(serializado);
        transacciones.forEach(transaccion => agregarElementoTransaccion(transaccion));
    }
    const idSerializado = window.localStorage.getItem("id");
    if (idSerializado) {
        id = Number(idSerializado);
    }
    actualizarControlGastos();
}

cargarTransacciones();