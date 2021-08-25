//ejecucion del server instanciado
/*
const startServer = require("./src/loaders/index");

startServer();*/


const startServer = async()=>{
    require("./loaders")();
}

startServer();
