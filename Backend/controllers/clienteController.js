const clienteService = require("../services/clienteService");

// GET /api/clientes
const obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteService.obtenerClientes();

        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener clientes",
            error: error.message
        });
    }
};

// GET /api/clientes/:id
const obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await clienteService.obtenerClientePorId(
            req.params.id
        );

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener cliente",
            error: error.message
        });
    }
};

// POST /api/clientes
const crearCliente = async (req, res) => {
    try {
        const {
            rut_empresa,
            rubro,
            razon_social,
            telefono,
            direccion,
            nombre_contacto,
            email_contacto
        } = req.body;

        if (
            !rut_empresa ||
            !rubro ||
            !razon_social ||
            !telefono ||
            !direccion ||
            !nombre_contacto ||
            !email_contacto
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const cliente = await clienteService.crearCliente(req.body);

        return res.status(201).json({
            mensaje: "Cliente creado correctamente",
            cliente
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: error.message
        });
    }
};

// PUT /api/clientes/:id
const actualizarCliente = async (req, res) => {
    try {
        const {
            rut_empresa,
            rubro,
            razon_social,
            telefono,
            direccion,
            nombre_contacto,
            email_contacto
        } = req.body;

        if (
            !rut_empresa ||
            !rubro ||
            !razon_social ||
            !telefono ||
            !direccion ||
            !nombre_contacto ||
            !email_contacto
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const cliente = await clienteService.actualizarCliente(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            mensaje: "Cliente actualizado correctamente",
            cliente
        });
    } catch (error) {
        if (error.message === "Cliente no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        return res.status(400).json({
            mensaje: error.message
        });
    }
};

// DELETE /api/clientes/:id
const eliminarCliente = async (req, res) => {
    try {
        await clienteService.eliminarCliente(req.params.id);

        return res.status(200).json({
            mensaje: "Cliente eliminado correctamente"
        });
    } catch (error) {
        if (error.message === "Cliente no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        return res.status(500).json({
            mensaje: "Error al eliminar cliente",
            error: error.message
        });
    }
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};