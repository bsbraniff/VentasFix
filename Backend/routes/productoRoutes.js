const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController");
const verificarToken = require("../middleware/authMiddleware");

// Obtener todos los productos
router.get("/", verificarToken, productoController.obtenerProductos);

// Obtener producto por ID
router.get("/:id", verificarToken, productoController.obtenerProductoPorId);

// Crear producto
router.post("/", verificarToken, productoController.crearProducto);

// Actualizar producto
router.put("/:id", verificarToken, productoController.actualizarProducto);

// Eliminar producto
router.delete("/:id", verificarToken, productoController.eliminarProducto);

module.exports = router;