const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    console.log("error de isAuthenticated")   
};

module.exports = helpers;



