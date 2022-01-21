const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var perguntas = require('../model/perguntas');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await perguntas.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    })

    res.json({
        success: true,
        data: data
    });
}

controllers.create = async(req, res) => {
    const {pergunta, resposta} = req.body;

    const data = await perguntas.create({
        pergunta:pergunta,
        resposta:resposta
    })
    .then(function(data){
        return data;
    })
    .catch(error=>{
        console.log(error);
        return error;
    })

    res.status(200).json({
        success: true,
        message: "Pergunta criada com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await perguntas.findAll({
        where: {id : id}
    })
    .then(function(data){
        return data;
    })
    .catch(error=>{
        console.log(error);
        return error;
    })

    res.json({
        success:true,
        data: data
    })
}

controllers.update = async (req,res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const {pergunta, resposta } = req.body;
    // Update data
    const data = await perguntas.update({
      pergunta:pergunta,
      resposta:resposta
    },
    {
      where: { id: id}
    })
    .then( function(data){
      return data;
    })
    .catch(error => {
      return error;
    }) 
    res.json({success:true, data:data, message:"Atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await perguntas.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Apagado com sucesso."});
  }

module.exports = controllers;