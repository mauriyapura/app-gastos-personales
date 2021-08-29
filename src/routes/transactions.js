const { Router } = require("express");

const {
    getTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactions");

const {
    postTransactionsValidations,
    updateTransactionsValidations
} = require("../middlewares/transactions.js/index");


const routes = Router();

routes.get("/", getTransactions);
routes.post("/", postTransactionsValidations, postTransaction);
routes.put("/:id", updateTransactionsValidations, updateTransaction);
routes.delete("/:id", deleteTransaction);


module.exports = routes;





