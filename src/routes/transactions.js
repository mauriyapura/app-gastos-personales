

const { Router } = require("express");

const {
    getTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactions");



const routes = Router();


routes.get("/", getTransactions);
routes.post("/", postTransaction);
routes.put("/:id", updateTransaction);
routes.delete("/:id", deleteTransaction);


module.exports = routes;





