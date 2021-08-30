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

/*
routes.post("/signin", passport.authenticate("local", {
    successRedirect:"/main",
    failureRedirect:"/users/signin"     
}));*/

module.exports = routes;
