"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("WhatsappQueues", {
            whatsappId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true
            },
            queueId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true
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
        return queryInterface.dropTable("WhatsappQueues");
    }
};
