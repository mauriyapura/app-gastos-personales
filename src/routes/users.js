const { Router } = require("express");
const {    
    getUser,
    postUser,
    updateUser,
    deleteUser
} = require("../controllers/users");

const {
    getRequestValidations,
    postRequestValidations
} = require("../middlewares/users/index");


const routes = Router();


routes.get("/", getRequestValidations, getUser);
routes.post("/", postRequestValidations,postUser);
routes.put("/:id", updateUser);
routes.delete("/:id", deleteUser);


module.exports = routes;
