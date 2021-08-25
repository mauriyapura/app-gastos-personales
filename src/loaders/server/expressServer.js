
const express = require("express");
const path = require("path");
const config = require("../../config/index");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("../logger/index");


class ExpressServer{

    constructor(){

        this.app = express();
        this.port = config.port;
        this.basePathAuth = `${config.api.prefix}/auth`;
        this._middlewares();

        this._notFound();    

    }

    _middlewares(){
        this.app.use(express.json());
        this.app.use(morgan("tiny"));
        this.app.use(cors());
    }
    /*
    _routes(){            

        this.app.use(this.basePathAuth, require("../../routes/auth"));
        this.app.use(this.basePathUser, require("../../routes/users"));
    }*/

    _notFound(){
        this.app.use((req,res,next)=>{
            const err = new Error("Not found");
            err.status = 404;
            err.code = 404;
            next(err);
        });
    }

    _errorHandler(){
        this.app.use((err,req,res,next)=>{
            const code = err.code || 500;
            //res.status(code);

            const body = {
                error: {
                    code,
                    message: err.message,
                    detail: err.data
                }
            }
            res.status(code).json(body);
        });
    }

    async start(){
        this.app.listen(this.port,(error)=>{
            if(error){
                logger.error(error);
                process.exit(1);
                return;
            }            
        })
    }



}


module.exports = ExpressServer;












