const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    return await Usuario.findAll({
        attributes: {
            exclude: ["password"]
        }
    });
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });
};

// Crear usuario
const crearUsuario = async (datos) => {
    const { rut, nombre, apellido, email, password } = datos;

    const usuarioExistente = await Usuario.findOne({
        where: { email }
    });

    if (usuarioExistente) {
        throw new Error("El email ya está registrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await Usuario.create({
        rut,
        nombre,
        apellido,
        email,
        password: passwordHash
    });
};

// Actualizar usuario
const actualizarUsuario = async (id, datos) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const { rut, nombre, apellido, email, password } = datos;

    const emailExistente = await Usuario.findOne({
        where: { email }
    });

    if (emailExistente && emailExistente.id !== Number(id)) {
        throw new Error("El email ya está registrado");
    }

    const datosActualizados = {
        rut,
        nombre,
        apellido,
        email
    };

    if (password) {
        datosActualizados.password = await bcrypt.hash(password, 10);
    }

    await usuario.update(datosActualizados);

    return usuario;
};

// Eliminar usuario
const eliminarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    await usuario.destroy();

    return true;
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};