const {check} = require("express-validator");
const AppError = require("../../handlers/appError");
const Transaction = require("../../models/transaction");

const {validationResult} = require("../commons");


const _typeExist = check("type", "type required").not().isEmpty();
const _descriptionExist = check("description", "description required").not().isEmpty();
const _amount = check("amount", "amount required").not().isEmpty();
const _amountIsNumber = check("amount", "amount must be a number").isNumeric();


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
    postTransactionsValidations,
    updateTransactionsValidations
}
