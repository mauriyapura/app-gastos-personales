
const {check} = require("express-validator");
const AppError = require("../../handlers/appError");
const User = require("../../models/users");
const {validationResult} = require("../commons");


const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
/*
const _emailExist = check("email1").custom(
    async (email1)=>{        
        const userFound = await User.findOne({
            where: { email: email1 }
        })
        console.log(email1, "---------")
        if(!userFound){
            throw new AppError("Email doesn´t exist in DB", 400);
        }
    }
);*/

const _password = check("password", "Password required").not().isEmpty();
const _passwordlength = check("password", "Password required").custom(
    async (password)=>{
        const minPassword = password.trim();   
        if(minPassword.toString().length < 4){
            throw new AppError("Password must be at least 4 characteres", 400);
        }
    }
);


const getRequestValidations = [
    _emailRequired,
    _emailValid,
    //_emailExist,
    _password,
    validationResult    
]

const postRequestValidations = [
    _emailRequired,
    _emailValid,
    //_emailExist,
    _password,
    _passwordlength,
    validationResult
]

module.exports = {
    getRequestValidations,
    postRequestValidations
}



