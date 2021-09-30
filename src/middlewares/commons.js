const {validationResult} = require("express-validator");
const AppError = require("../handlers/appError");

const validResult = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        //res.json(errors)
        throw new AppError("Validation Errors", 400, errors.errors)
        //return res.status(400).json(errors)
    }    

    next();
}

module.exports = {
    validationResult: validResult,
}