//import express
const express = require('express');
const app = express();

//setting port
app.set('port', process.env.POST||3000);

//Middlewares
app.use(express.json());

//configurasi cros json
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const perguntasRouters = require('./routes/PerguntasRoute');
app.use('/perguntas', perguntasRouters);


app.use('/', (req, res) => {
    res.send("Hello world from Node Js Server");
});

app.listen(app.get('port'), () => {
    console.log("Starting server Node Js");
});
