document.addEventListener("DOMContentLoaded", function () {
    const listaProductos = document.getElementById("listaProductos");
    const resultado = document.getElementById("resultado");
    let productosEnStock = [];
    let productoAEditarIndex = null; // Variable para almacenar el índice del producto que se está editando

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

    // función para abrir el formulario de edición de producto
    function abrirFormularioEdicionProducto() {
        const formularioEdicionProducto = document.getElementById("formularioEdicionProducto");
        formularioEdicionProducto.style.display = "block";
    }
    // función para buscar un producto por nombre y mostrar el formulario de edición si se encuentra
    function buscarYMostrarFormularioEdicion() {
        const nombreBusquedaEdicion = document.getElementById("nombreBusquedaEdicion").value;
        const productoEncontrado = productosEnStock.find(producto => producto.nombre === nombreBusquedaEdicion);

        if (productoEncontrado) {
            // Mostrar el formulario de edición de producto
            abrirFormularioEdicionProducto();

            // Limpiar campos de búsqueda
            document.getElementById("nombreBusquedaEdicion").value = "";

            // Mostrar el formulario de edición con los datos del producto
            document.getElementById("nuevoNombreProducto").value = productoEncontrado.nombre;
            document.getElementById("nuevoPrecioProducto").value = productoEncontrado.precio;

            // Guardar el índice del producto encontrado para futuras ediciones
            productoAEditarIndex = productosEnStock.indexOf(productoEncontrado);
        } else {
            // Mostrar mensaje de que no se encontró el nombre
            mostrarMensajeBusqueda("No se encontró el producto con ese nombre.");
        }
    }

    // función para guardar los cambios en el producto editado
    function guardarCambiosEdicion() {
        const nuevoNombre = document.getElementById("nuevoNombreProducto").value;
        const nuevoPrecio = document.getElementById("nuevoPrecioProducto").value;

        if (nuevoNombre !== "" && nuevoPrecio !== "" && productoAEditarIndex !== null) {
            // Actualizar los datos del producto
            productosEnStock[productoAEditarIndex].nombre = nuevoNombre;
            productosEnStock[productoAEditarIndex].precio = parseFloat(nuevoPrecio);

            // Ocultar el formulario de edición
            ocultarFormularioEdicionProducto();

            // Actualizar la lista y guardar en localStorage
            localStorage.setItem("productosEnStock", JSON.stringify(productosEnStock));
            actualizarListaProductos();
        } else {
            // Mostrar mensaje de que faltan campos
            mostrarMensajeBusqueda("Por favor, completa todos los campos.");
        }
    }

// función para ocultar el formulario de edición de producto
function ocultarFormularioEdicionProducto() {
    const formularioEdicionProducto = document.getElementById("formularioEdicionProducto");
    formularioEdicionProducto.style.display = "none";

    // Limpiar campos del formulario de edición
    document.getElementById("nuevoNombreProducto").value = "";
    document.getElementById("nuevoPrecioProducto").value = "";

    // Restablecer la variable de índice a null
    productoAEditarIndex = null;
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
    // Event Listener para el botón "Buscar y Editar" en el formulario de búsqueda y edición
    document.getElementById("btnBuscarYEditar").addEventListener("click", function () {
        buscarYMostrarFormularioEdicion();
    });
    // Event Listener para el botón "Guardar Cambios" en el formulario de edición
    document.getElementById("btnGuardarCambios").addEventListener("click", function () {
        guardarCambiosEdicion();
    });
});
