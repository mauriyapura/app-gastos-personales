

const { Router } = require("express");
const {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
} = require("../controllers/users");



const routes = Router();


routes.get("/", getUsers);
routes.get("/:id", getUser);

routes.post("/", postUser);
routes.put("/:id", updateUser);
routes.delete("/:id", deleteUser);



module.exports = routes;
