"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Whatsapps", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            session: {
                type: sequelize_1.DataTypes.TEXT
            },
            qrcode: {
                type: sequelize_1.DataTypes.TEXT
            },
            status: {
                type: sequelize_1.DataTypes.STRING
            },
            battery: {
                type: sequelize_1.DataTypes.STRING
            },
            plugged: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("Whatsapps");
    }
};
