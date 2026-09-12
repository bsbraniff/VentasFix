const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const verificarToken = require("./middleware/authMiddleware");
const usuarioRoutes = require("./routes/usuarioRoutes");

require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get("/api/protegido", verificarToken, (req, res) => {

    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });

});

app.get("/", (req, res) => {
    res.json({
        mensaje: "API VentasFix funcionando correctamente"
    });
});



const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(async () => {

        console.log("Conexión a MySQL establecida correctamente.");

        await sequelize.sync();

        console.log("Modelos sincronizados correctamente.");

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });

    })
    .catch((error) => {
        console.error("Error al conectar con MySQL:", error);
    });