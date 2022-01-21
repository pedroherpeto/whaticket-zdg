const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'chatbot';

var pergunta = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    pergunta: Sequelize.STRING,
    resposta: Sequelize.STRING
})

module.exports = pergunta;