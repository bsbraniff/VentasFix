const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");
const verificarToken = require("../middleware/authMiddleware");

// Obtener todos
router.get("/", verificarToken, usuarioController.obtenerUsuarios);

// Obtener por ID
router.get("/:id", verificarToken, usuarioController.obtenerUsuarioPorId);

// Crear
router.post("/", verificarToken, usuarioController.crearUsuario);

// Actualizar
router.put("/:id", verificarToken, usuarioController.actualizarUsuario);

// Eliminar
router.delete("/:id", verificarToken, usuarioController.eliminarUsuario);

module.exports = router;