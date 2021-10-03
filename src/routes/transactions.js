const { Router } = require("express");
const { isAuthenticated} = require("../helpers/auth");

const {
    getTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactions");

const {
    getTransactionsValidations,
    postTransactionsValidations,
    updateTransactionsValidations
} = require("../middlewares/transactions.js/index");


const routes = Router();

routes.get("/:id", getTransactionsValidations, getTransactions);
routes.post("/", postTransactionsValidations, postTransaction);
routes.put("/:id", updateTransactionsValidations, updateTransaction);
routes.delete("/:id", deleteTransaction);


module.exports = routes;





