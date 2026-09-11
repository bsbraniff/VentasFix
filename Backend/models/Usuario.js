const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        rut: {
            type: DataTypes.STRING(12),
            allowNull: false
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: "usuarios",
        timestamps: true
    }
);

module.exports = Usuario;