const usuarioService = require("../services/usuarioService");

// GET /api/usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
};

// GET /api/usuarios/:id
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener usuario",
            error: error.message
        });
    }
};

// POST /api/usuarios
const crearUsuario = async (req, res) => {
    try {
        const {
            rut,
            nombre,
            apellido,
            email,
            password
        } = req.body;

        if (!rut || !nombre || !apellido || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (!email.endsWith("@ventasfix.cl")) {
            return res.status(400).json({
                mensaje: "El email debe pertenecer al dominio @ventasfix.cl"
            });
        }

        const usuario = await usuarioService.crearUsuario(req.body);

        return res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: {
                id: usuario.id,
                rut: usuario.rut,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: error.message
        });
    }
};

// PUT /api/usuarios/:id
const actualizarUsuario = async (req, res) => {
    try {
        const {
            rut,
            nombre,
            apellido,
            email,
            password
        } = req.body;

        if (!rut || !nombre || !apellido || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (!email.endsWith("@ventasfix.cl")) {
            return res.status(400).json({
                mensaje: "El email debe pertenecer al dominio @ventasfix.cl"
            });
        }

        const usuario = await usuarioService.actualizarUsuario(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: {
                id: usuario.id,
                rut: usuario.rut,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });
    } catch (error) {
        if (error.message === "Usuario no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        return res.status(400).json({
            mensaje: error.message
        });
    }
};

// DELETE /api/usuarios/:id
const eliminarUsuario = async (req, res) => {
    try {
        await usuarioService.eliminarUsuario(req.params.id);

        return res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });
    } catch (error) {
        if (error.message === "Usuario no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        return res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};