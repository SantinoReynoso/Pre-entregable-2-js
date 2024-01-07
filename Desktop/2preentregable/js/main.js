document.addEventListener("DOMContentLoaded", function () {
    const listaProductos = document.getElementById("listaProductos");
    const resultado = document.getElementById("resultado");
    let productosEnStock = [];

// Cargar productos almacenados en localStorage al iniciar la página
    if (localStorage.getItem("productosEnStock")) {
        productosEnStock = JSON.parse(localStorage.getItem("productosEnStock"));
        actualizarListaProductos();
    }

// función que actualiza la lista de productos en la página web
    function actualizarListaProductos() {
        listaProductos.innerHTML = "";
        for (const producto of productosEnStock) {
            const li = document.createElement("li");
            li.textContent = `\nEl producto ${producto.nombre} tiene un precio de lista de: $${producto.precio.toFixed(2)}\n`;
            listaProductos.appendChild(li);
        }
    }

// función que agrega un producto al stock y lo guarda en localStorage
    function agregarProducto() {
        const nombreProducto = document.getElementById("nombreProducto").value;
        const precioProducto = document.getElementById("precioProducto").value;

        if (nombreProducto !== "" && precioProducto !== "") {
            const nuevoProducto = {
                nombre: nombreProducto,
                precio: parseFloat(precioProducto)
            };
            productosEnStock.push(nuevoProducto);
            // Guardar productos en localStorage
            localStorage.setItem("productosEnStock", JSON.stringify(productosEnStock));
            actualizarListaProductos();
        }
    }

// función que calcula el precio con IVA y ganancia de todos los productos juntos
    function calcularPrecio() {
        resultado.innerHTML = ""; // Limpiamos el contenido anterior
    
        for (const producto of productosEnStock) {
            const precioConIVA = producto.precio * 1.21;
            const precioConGanancia = precioConIVA * 1.25;
    
            // Creamos un nuevo elemento <p> para mostrar la información de cada producto
            const productoInfo = document.createElement("p");
            productoInfo.textContent = `Producto: ${producto.nombre} - Precio de lista: $${producto.precio.toFixed(2)} - Precio con IVA y ganancia: $${precioConGanancia.toFixed(2)}`;
    
            // Añadimos el elemento al resultado
            resultado.appendChild(productoInfo);
        }
    }

// función para calcular en base al nombre del producto que quieras
    function buscarProductoYCalcularPrecio() {
        const nombreBusqueda = document.getElementById("nombreBusqueda").value;
        const productoEncontrado = productosEnStock.find(producto => producto.nombre === nombreBusqueda);

        if (productoEncontrado) {
            const precioConIVA = productoEncontrado.precio * 1.21;
            const precioConGanancia = precioConIVA * 1.25;
            resultado.textContent = `El precio de ${productoEncontrado.nombre} con IVA y ganancia es: $${precioConGanancia.toFixed(2)}`;
        } else {
            resultado.textContent = "Ningún producto tiene ese nombre.";
        }
    }

// función que borra todos los productos del stock y actualiza la lista y guarda en localStorage
    function borrarProductos() {
        // Borra todos los productos del stock
        productosEnStock = [];
        // Actualiza la lista y guarda en localStorage
        localStorage.setItem("productosEnStock", JSON.stringify(productosEnStock));
        actualizarListaProductos();
    }

    // función para mostrar el formulario de búsqueda y edición de producto
    function mostrarFormularioBusquedaEdicion() {
        const formularioBusquedaEdicion = document.getElementById("formularioBusquedaEdicion");
        formularioBusquedaEdicion.style.display = "block";
    }

    // función para ocultar el formulario de búsqueda y edición de producto
    function ocultarFormularioBusquedaEdicion() {
        const formularioBusquedaEdicion = document.getElementById("formularioBusquedaEdicion");
        formularioBusquedaEdicion.style.display = "none";

        // Limpiar campos del formulario de búsqueda
        document.getElementById("nombreBusquedaEdicion").value = "";
    }

// Event Listeners
    document.getElementById("btnAgregarProducto").addEventListener("click", function () {
        agregarProducto();
    });

    document.getElementById("btnBuscarYCalcularPrecio").addEventListener("click", function () {
        buscarProductoYCalcularPrecio();
    });

    document.getElementById("btnCalcularPrecio").addEventListener("click", function () {
        calcularPrecio();
    });

    document.getElementById("btnBorrarProductos").addEventListener("click", function () {
        borrarProductos();
    });
       // Event Listener para mostrar el formulario de búsqueda y edición
       document.getElementById("btnMostrarFormularioBusqueda").addEventListener("click", function () {
        mostrarFormularioBusquedaEdicion();
    });

    // Event Listener para ocultar el formulario de búsqueda y edición
    document.getElementById("btnOcultarFormularioEdicion").addEventListener("click", function () {
        ocultarFormularioBusquedaEdicion();
    });
});
