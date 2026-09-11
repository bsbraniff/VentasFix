const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define(
    "Cliente",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        rut_empresa: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true
        },

        rubro: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        razon_social: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        telefono: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        direccion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        nombre_contacto: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        email_contacto: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    },
    {
        tableName: "clientes",
        timestamps: true
    }
);

module.exports = Cliente;