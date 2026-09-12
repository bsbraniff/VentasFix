const Producto = require("../models/Producto");

// Obtener todos los productos
const obtenerProductos = async () => {
    return await Producto.findAll();
};

// Obtener producto por ID
const obtenerProductoPorId = async (id) => {
    return await Producto.findByPk(id);
};

// Crear producto
const crearProducto = async (datos) => {
    const {
        sku,
        nombre,
        descripcion_corta,
        descripcion_larga,
        imagen,
        precio_neto,
        stock_actual,
        stock_minimo,
        stock_bajo,
        stock_alto
    } = datos;

    const productoExistente = await Producto.findOne({
        where: { sku }
    });

    if (productoExistente) {
        throw new Error("El SKU ya está registrado");
    }

    // Cálculo del precio de venta con IVA 19%
    const precioVenta = Number(precio_neto) * 1.19;

    return await Producto.create({
        sku,
        nombre,
        descripcion_corta,
        descripcion_larga,
        imagen,
        precio_neto,
        precio_venta: precioVenta,
        stock_actual,
        stock_minimo,
        stock_bajo,
        stock_alto
    });
};

// Actualizar producto
const actualizarProducto = async (id, datos) => {
    const producto = await Producto.findByPk(id);

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    const {
        sku,
        nombre,
        descripcion_corta,
        descripcion_larga,
        imagen,
        precio_neto,
        stock_actual,
        stock_minimo,
        stock_bajo,
        stock_alto
    } = datos;

    const skuExistente = await Producto.findOne({
        where: { sku }
    });

    if (skuExistente && skuExistente.id !== Number(id)) {
        throw new Error("El SKU ya está registrado");
    }

    // Recalcular precio de venta con IVA 19%
    const precioVenta = Number(precio_neto) * 1.19;

    await producto.update({
        sku,
        nombre,
        descripcion_corta,
        descripcion_larga,
        imagen,
        precio_neto,
        precio_venta: precioVenta,
        stock_actual,
        stock_minimo,
        stock_bajo,
        stock_alto
    });

    return producto;
};

// Eliminar producto
const eliminarProducto = async (id) => {
    const producto = await Producto.findByPk(id);

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    await producto.destroy();

    return true;
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};