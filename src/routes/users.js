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

/*
routes.post("/login", passport.authenticate("local"), (req,res)=>{
    res.json({email: req.user.email, password: req.user.password})
});
*/

routes.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (! user) {
        return res.send({ success: false, message : 'Email or password Incorrect' });
      }
      // ***********************************************************************
      // "Note that when using a custom callback, it becomes the application's
      // responsibility to establish a session (by calling req.login()) and send
      // a response."
      // Source: http://passportjs.org/docs
      // ***********************************************************************
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({success: true, email: req.user.email, password: req.user.password, user_id: req.user.id});
      });      
    })(req, res, next);
  });


  module.exports = routes;