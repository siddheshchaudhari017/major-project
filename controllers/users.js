const User = require("../models/user.js");

module.exports.rendersignupform=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signup =async(req,res)=>{
    try{
    let {email,username,password} = req.body;
    let newUser = new User({email,username});
    let registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            req.flash("error",err.message);
            return res.redirect("/signup");
        }

        req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listings");
    });
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }};

    module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs");
};

    module.exports.login = async(req,res)=>{
    req.flash("success","Welcome to Wanderlust! you are logged in!");
    res.redirect(res.locals.redirectUrl || "/listings" );
    
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have been logged out!");
        res.redirect("/listings");
    });
};