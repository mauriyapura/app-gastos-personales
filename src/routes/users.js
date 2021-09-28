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

const passport = require("passport");
const routes = Router();


routes.get("/", getRequestValidations, getUser);
routes.post("/", postRequestValidations,postUser);
routes.put("/:id", updateUser);
routes.delete("/:id", deleteUser);


routes.post("/login", passport.authenticate("local"), (req,res)=>{
    res.json({email: req.user.email, password: req.user.password})
});

module.exports = routes;
