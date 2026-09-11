require("dotenv").config();

const bcrypt = require("bcryptjs");
const sequelize = require("./config/database");
const Usuario = require("./models/Usuario");

const crearUsuario = async () => {

    try {

        await sequelize.authenticate();

        const passwordHash = await bcrypt.hash(
            "VentasFix123",
            10
        );

        const usuario = await Usuario.create({
            rut: "12.345.678-9",
            nombre: "Barbara",
            apellido: "Santa Maria",
            email: "barbara@ventasfix.cl",
            password: passwordHash
        });

        console.log("Usuario creado:");
        console.log(usuario.toJSON());

        process.exit();

    } catch (error) {

        console.error("Error:", error);

        process.exit(1);
    }
};

crearUsuario();