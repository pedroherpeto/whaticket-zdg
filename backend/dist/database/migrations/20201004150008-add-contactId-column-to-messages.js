"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Messages", "contactId", {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: "Contacts", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Messages", "contactId");
    }
};
