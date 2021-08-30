
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({
    usernameField:"email",

}, async(email,password,done)=>{
    const user = await User.findOne({where: {
        email: email
    }});
    if(!user){
        return done(null,false,{message:"Not User Found"});
    }else{
        const newPass = await bcrypt.hash(password, 10);
        const savedPass = user.password;

        if (newPass == savedPass){
            return done(null,user);
        }else{
            return done(null,false,{message:"Incorrect Password"});
        }
    }
}));


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findByPk(id,(err,user)=>{
        done(err,user);
    });
});









