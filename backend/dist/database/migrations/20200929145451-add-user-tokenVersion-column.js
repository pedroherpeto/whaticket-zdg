"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Users", "tokenVersion", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Users", "tokenVersion");
    }
};
