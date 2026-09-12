const productoService = require("../services/productoService");

// GET /api/productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await productoService.obtenerProductos();

        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener productos",
            error: error.message
        });
    }
};

// GET /api/productos/:id
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await productoService.obtenerProductoPorId(
            req.params.id
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json(producto);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener producto",
            error: error.message
        });
    }
};

// POST /api/productos
const crearProducto = async (req, res) => {
    try {
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
        } = req.body;

        // Validar campos obligatorios
        if (
            !sku ||
            !nombre ||
            !descripcion_corta ||
            !descripcion_larga ||
            !imagen ||
            precio_neto === undefined ||
            stock_actual === undefined ||
            stock_minimo === undefined ||
            stock_bajo === undefined ||
            stock_alto === undefined
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        // Validar precio
        if (Number(precio_neto) <= 0) {
            return res.status(400).json({
                mensaje: "El precio neto debe ser mayor que 0"
            });
        }

        // Validar stock
        if (
            Number(stock_actual) < 0 ||
            Number(stock_minimo) < 0 ||
            Number(stock_bajo) < 0 ||
            Number(stock_alto) < 0
        ) {
            return res.status(400).json({
                mensaje: "Los valores de stock no pueden ser negativos"
            });
        }

        const producto = await productoService.crearProducto(req.body);

        return res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: error.message
        });
    }
};

// PUT /api/productos/:id
const actualizarProducto = async (req, res) => {
    try {
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
        } = req.body;

        // Validar campos obligatorios
        if (
            !sku ||
            !nombre ||
            !descripcion_corta ||
            !descripcion_larga ||
            !imagen ||
            precio_neto === undefined ||
            stock_actual === undefined ||
            stock_minimo === undefined ||
            stock_bajo === undefined ||
            stock_alto === undefined
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        // Validar precio
        if (Number(precio_neto) <= 0) {
            return res.status(400).json({
                mensaje: "El precio neto debe ser mayor que 0"
            });
        }

        // Validar stock
        if (
            Number(stock_actual) < 0 ||
            Number(stock_minimo) < 0 ||
            Number(stock_bajo) < 0 ||
            Number(stock_alto) < 0
        ) {
            return res.status(400).json({
                mensaje: "Los valores de stock no pueden ser negativos"
            });
        }

        const producto = await productoService.actualizarProducto(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            producto
        });

    } catch (error) {

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        return res.status(400).json({
            mensaje: error.message
        });
    }
};

// DELETE /api/productos/:id
const eliminarProducto = async (req, res) => {
    try {
        await productoService.eliminarProducto(req.params.id);

        return res.status(200).json({
            mensaje: "Producto eliminado correctamente"
        });

    } catch (error) {

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        return res.status(500).json({
            mensaje: "Error al eliminar producto",
            error: error.message
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};