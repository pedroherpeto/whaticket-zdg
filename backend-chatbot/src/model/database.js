var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'whaticket', //database
    'root', //username
    '', //password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;