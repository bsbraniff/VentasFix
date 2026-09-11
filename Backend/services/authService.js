const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const login = async (email, password) => {

    const usuario = await Usuario.findOne({
        where: { email }
    });

    if (!usuario) {
        throw new Error("Credenciales inválidas");
    }

    const passwordValida = await bcrypt.compare(
        password,
        usuario.password
    );

    if (!passwordValida) {
        throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            rut: usuario.rut,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email
        }
    };
};

module.exports = {
    login
};