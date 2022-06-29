const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.signup = async function (req, res, next) {
    try {
        console.log(req.body);
        const user = await User.create({...req.body})
        console.log(user)
        res.render("auth/signup");
    } catch (error) {
        //Falta control de errores
        res.render("auth/signup",{errorMessage:error});
        next(error);
    }

}

exports.login = async function (req, res, next) {
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        console.log(user)
        if (username === "" || password === "") {
            res.render("auth/login", { errorMessage: "Please enter both, username and password to login." });
            return
        }
        if(!user) {
            res.render("auth/login", { errorMessage: "Username is not registered. Try with other username." });
            return
        }
        if(!bcrypt.compareSync(password, user.password)){
            res.render("auth/login", { errorMessage: "Incorrect password." });
            return
        }
        req.session.currentUser = user;
        res.redirect("/userProfile");

    } catch (error) {
        //Falta control de errores
        res.render("auth/login",{errorMessage:error});
        next(error);
    }

}