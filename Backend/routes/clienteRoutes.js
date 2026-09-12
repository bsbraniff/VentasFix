const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");
const verificarToken = require("../middleware/authMiddleware");

// Obtener todos
router.get("/", verificarToken, clienteController.obtenerClientes);

// Obtener por ID
router.get("/:id", verificarToken, clienteController.obtenerClientePorId);

// Crear
router.post("/", verificarToken, clienteController.crearCliente);

// Actualizar
router.put("/:id", verificarToken, clienteController.actualizarCliente);

// Eliminar
router.delete("/:id", verificarToken, clienteController.eliminarCliente);

module.exports = router;