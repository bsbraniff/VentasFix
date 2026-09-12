const Usuario = require("../models/Usuario");
const Producto = require("../models/Producto");
const Cliente = require("../models/Cliente");

const obtenerResumen = async () => {
    const usuarios = await Usuario.count();
    const productos = await Producto.count();
    const clientes = await Cliente.count();

    return {
        usuarios,
        productos,
        clientes
    };
};

module.exports = {
    obtenerResumen
};