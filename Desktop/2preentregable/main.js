// Función para agregar un nuevo producto al stock
function agregarNuevoProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const precioProducto = document.getElementById("precioProducto").value;

    if (nombreProducto !== "" && precioProducto !== "") {
        const li = document.createElement("li");
        li.innerHTML = `${nombreProducto} - Precio: $${precioProducto}`;

        document.getElementById("listaProductosAgregados").appendChild(li);
    }
}

// Función para mostrar todos los productos del stock
function mostrarProductos() {
    const listaProductosAgregados = document.getElementById("listaProductosAgregados");

    if (listaProductosAgregados.childElementCount > 0) {
        for (let i = 0; i < listaProductosAgregados.childElementCount; i++) {
            document.getElementById("listaProductos").appendChild(listaProductosAgregados.childNodes[i]);
        }
    } else {
        const li = document.createElement("li");
        li.innerHTML = "No hay productos hasta el momento.";
        document.getElementById("listaProductos").appendChild(li);
    }
}

// Función para calcular el precio de un producto nuevo
function calcularPrecio() {
    // Tu implementación de esta función aquí
}
