const {check} = require("express-validator");
const AppError = require("../../handlers/appError");
const Transaction = require("../../models/transaction");
const User = require("../../models/users");

const {validationResult} = require("../commons");


const _typeExist = check("type", "type required").not().isEmpty();
const _descriptionExist = check("description", "description required").not().isEmpty();
const _amount = check("amount", "amount required").not().isEmpty();
const _amountIsNumber = check("amount", "amount must be a number").isNumeric();


const _idIsValid = check("id").custom(
    
    async (id)=>{        
        const userFound = await User.findByPk(id)
        console.log(`clg de findbypk. el id pasado es ${id}`)
        console.log(userFound)
        if(!userFound){
            throw new AppError("This id doesn't exist", 400);
        }
    }
);

const getTransactionsValidations = [
    _idIsValid,
    validationResult
]


const postTransactionsValidations = [
    _typeExist,
    _descriptionExist,
    _amount,
    _amountIsNumber,
    validationResult
]

const updateTransactionsValidations = [
    _descriptionExist,
    _amount,
    _amountIsNumber,
    validationResult
]



module.exports= {
    getTransactionsValidations,
    postTransactionsValidations,
    updateTransactionsValidations
}
