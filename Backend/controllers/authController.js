const authService = require("../services/authService");

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y password son obligatorios"
            });
        }

        if (!email.endsWith("@ventasfix.cl")) {
            return res.status(400).json({
                mensaje: "El email debe pertenecer al dominio @ventasfix.cl"
            });
        }

        const resultado = await authService.login(
            email,
            password
        );

        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            ...resultado
        });

    } catch (error) {

        return res.status(401).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    login
};