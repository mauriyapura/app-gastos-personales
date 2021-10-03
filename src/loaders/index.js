// Instanciar clase ExpressServer

const ExpressServer = require("./server/expressServer");
const config = require("../config/index");
const logger = require("./logger/index");
const sequelize = require("../loaders/sequelize/index");
require("../models/assocciations");


const startServer = async ()=> {
    try {

        await sequelize.authenticate();    
        //sequelize.sync({ alter: true }); 
        sequelize.sync();   
        logger.info("DB loaded and connected");     
    
        const server = new ExpressServer();
        logger.info("Express loaded");
  
        server.start();
        logger.info(`###########################
            Server listening on port: ${config.port}
      ###########################
        `);   

    } catch (error) {
        console.error("Unable to connect to database: ", error);        
    }
};

module.exports = startServer;



