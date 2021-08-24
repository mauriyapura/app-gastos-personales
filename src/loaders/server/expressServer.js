
const express = require("express");
const path = require("path");
const config = require("../../config/index");
const morgan = require("morgan");



class ExpressServer{

    constructor(){

        this.app = express();
        this.port = config.port
        this.basePathAuth = `${config.api.prefix}/auth`;
        this._middlewares();

        this._notFound();
    

    }

    _middlewares(){
        this.app.use(express.json());
        this.app.use(morgan("tiny"));
    }

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



}


module.exports = ExpressServer












