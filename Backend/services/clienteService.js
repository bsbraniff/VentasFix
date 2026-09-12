const Cliente = require("../models/Cliente");

// Obtener todos los clientes
const obtenerClientes = async () => {
    return await Cliente.findAll();
};

// Obtener cliente por ID
const obtenerClientePorId = async (id) => {
    return await Cliente.findByPk(id);
};

// Crear cliente
const crearCliente = async (datos) => {
    const {
        rut_empresa,
        rubro,
        razon_social,
        telefono,
        direccion,
        nombre_contacto,
        email_contacto
    } = datos;

    const clienteExistente = await Cliente.findOne({
        where: { rut_empresa }
    });

    if (clienteExistente) {
        throw new Error("El RUT de empresa ya está registrado");
    }

    return await Cliente.create({
        rut_empresa,
        rubro,
        razon_social,
        telefono,
        direccion,
        nombre_contacto,
        email_contacto
    });
};

// Actualizar cliente
const actualizarCliente = async (id, datos) => {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    const {
        rut_empresa,
        rubro,
        razon_social,
        telefono,
        direccion,
        nombre_contacto,
        email_contacto
    } = datos;

    const clienteExistente = await Cliente.findOne({
        where: { rut_empresa }
    });

    if (
        clienteExistente &&
        clienteExistente.id !== Number(id)
    ) {
        throw new Error("El RUT de empresa ya está registrado");
    }

    await cliente.update({
        rut_empresa,
        rubro,
        razon_social,
        telefono,
        direccion,
        nombre_contacto,
        email_contacto
    });

    return cliente;
};

// Eliminar cliente
const eliminarCliente = async (id) => {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    await cliente.destroy();

    return true;
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};