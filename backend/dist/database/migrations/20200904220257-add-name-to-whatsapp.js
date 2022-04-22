"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Whatsapps", "name", {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "name");
    }
};
