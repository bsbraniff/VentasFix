const dashboardService = require("../services/dashboardService");

const obtenerDashboard = async (req, res) => {
    try {
        const resumen = await dashboardService.obtenerResumen();

        return res.status(200).json({
            mensaje: "Resumen del dashboard obtenido correctamente",
            datos: resumen
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener información del dashboard",
            error: error.message
        });
    }
};

module.exports = {
    obtenerDashboard
};