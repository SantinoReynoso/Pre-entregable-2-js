// Productos en el stock actual
const productos = [
    { nombre: 'Producto 1', precio: 100 },
    { nombre: 'Producto 2', precio: 200 },
    { nombre: 'Producto 3', precio: 300 },
];

// Productos agregados por el usuario
let productosAgregados = [];

function mostrarProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    for (let i = 0; i < productos.length; i++) {
        const li = document.createElement('li');
        li.textContent = `Nombre: ${productos[i].nombre}, Precio: ${productos[i].precio}`;
        listaProductos.appendChild(li);
    }
}

function agregarNuevoProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = parseInt(document.getElementById('precioProducto').value);

    const nuevoProducto = { nombre: nombreProducto, precio: precioProducto };
    productosAgregados.push(nuevoProducto);

    mostrarProductosAgregados();
}

function mostrarProductosAgregados() {
    const listaProductosAgregados = document.getElementById('listaProductosAgregados');
    listaProductosAgregados.innerHTML = '';

    for (let i = 0; i < productosAgregados.length; i++) {
        const li = document.createElement('li');
        li.textContent = `Nombre: ${productosAgregados[i].nombre}, Precio: ${productosAgregados[i].precio}`;
        listaProductosAgregados.appendChild(li);
    }
}

 calcularPrecio() 