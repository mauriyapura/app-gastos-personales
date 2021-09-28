
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({
    usernameField:"email",
    passwordField: "password"

}, async(email,password,done)=>{
    const user = await User.findOne({where: {
        email: email
    }});
    if(!user){
        return done(null,false,{message:"User not Found"});
    }else{
        const savedPass = user.password;
        const newPass = await bcrypt.compare(password, savedPass);
        
        if (newPass){            
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


/*
passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    done(null, user);
});*/





