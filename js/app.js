// app.js - Control de Ventas y Gastos
// Diseñado por Eddy Pacheco - 2026

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const totalVentasSpan = document.getElementById('totalVentas');
    const totalGastosSpan = document.getElementById('totalGastos');
    const gananciaSpan = document.getElementById('ganancia');
    const listaRegistros = document.getElementById('lista-registros');

    // Botones
    const btnVenta = document.getElementById('btnVenta');
    const btnGasto = document.getElementById('btnGasto');
    const btnReset = document.getElementById('btnReset');

    // Validar que todos los elementos existan
    if (!totalVentasSpan || !totalGastosSpan || !gananciaSpan || !listaRegistros || !btnVenta || !btnGasto || !btnReset) {
        console.error('No se encontraron todos los elementos necesarios');
        return;
    }

    // Estado inicial
    let ventas = 15000;
    let gastos = 4500;

    // Función para formatear moneda (CLP)
    function formatearMoneda(valor) {
        return '$' + valor.toLocaleString('es-CL');
    }

    // Función para actualizar la UI
    function actualizarUI() {
        totalVentasSpan.innerText = formatearMoneda(ventas);
        totalGastosSpan.innerText = formatearMoneda(gastos);
        
        let ganancia = ventas - gastos;
        gananciaSpan.innerText = formatearMoneda(ganancia);
    }

    // Función para agregar item al historial
    function agregarItemHistorial(tipo, monto, descripcion = '') {
        const li = document.createElement('li');
        
        // Generar descripción por defecto si no se proporciona
        let textoDesc = descripcion;
        if (!textoDesc) {
            const opcionesVenta = ['Venta verdulería', 'Venta food truck', 'Venta feria', 'Venta del día'];
            const opcionesGasto = ['Compra mercadería', 'Pago transporte', 'Gasto varios', 'Insumos'];
            textoDesc = tipo === 'venta' 
                ? opcionesVenta[Math.floor(Math.random() * opcionesVenta.length)]
                : opcionesGasto[Math.floor(Math.random() * opcionesGasto.length)];
        }
        
        li.innerHTML = `<span>${textoDesc}</span> <strong>${tipo === 'venta' ? '+' : '-'}${formatearMoneda(monto)}</strong>`;
        li.className = tipo === 'venta' ? 'venta-item' : 'gasto-item';
        
        // Insertar al principio de la lista
        listaRegistros.insertBefore(li, listaRegistros.firstChild);
        
        // Mantener solo los últimos 5 registros
        while (listaRegistros.children.length > 5) {
            listaRegistros.removeChild(listaRegistros.lastElementChild);
        }
    }

    // Evento: Agregar venta
    btnVenta.addEventListener('click', function() {
        ventas += 15000;
        agregarItemHistorial('venta', 15000);
        actualizarUI();
    });

    // Evento: Agregar gasto
    btnGasto.addEventListener('click', function() {
        gastos += 4500;
        agregarItemHistorial('gasto', 4500);
        actualizarUI();
    });

    // Evento: Reiniciar a valores iniciales
    btnReset.addEventListener('click', function() {
        ventas = 15000;
        gastos = 4500;
        
        // Restaurar lista inicial
        listaRegistros.innerHTML = `
            <li class="venta-item"><span>Venta verdulería</span> <strong>+$15.000</strong></li>
            <li class="gasto-item"><span>Compra de mercadería</span> <strong>-$4.500</strong></li>
        `;
        
        actualizarUI();
    });

    // Inicializar UI
    actualizarUI();
});