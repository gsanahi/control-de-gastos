function nuevaTransaccion() {
    const concepto = document.getElementById("concepto-transaccion").value;
    const importe = document.getElementById("importe-transaccion").value;

    const transaccion = crearElementoTransaccion(concepto,importe)

    document.getElementById("historial").appendChild(transaccion);
}

function crearElementoTransaccion(concepto,importe){
    const elementoTransaccion = document.createElement('div'); // <div></div>
    const elementoImporte = document.createElement('div'); // <div></div>
    const elementoConcepto = document.createElement('div'); // <div></div>
    const elementoAcciones = document.createElement('div'); // <div></div>

    elementoImporte.innerText = importe; // <div>214</div>
    elementoConcepto.innerText = concepto; // <div>Cine</div>
    
    elementoTransaccion.appendChild(elementoImporte); // <div><div>214</div></div>
    elementoTransaccion.appendChild(elementoConcepto); // <div><div>214</div><div>Cine</div></div>
    elementoTransaccion.appendChild(elementoAcciones); // <div><div>214</div><div>Cine</div><div></div></div>

    return elementoTransaccion;
}