const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = sequelize.define(
    "Producto",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        sku: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },

        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        descripcion_corta: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        descripcion_larga: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        imagen: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        precio_neto: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },

        precio_venta: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },

        stock_actual: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        stock_minimo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        stock_bajo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        stock_alto: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "productos",
        timestamps: true
    }
);

module.exports = Producto;