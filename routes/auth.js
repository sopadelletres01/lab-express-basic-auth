const { signup,login } = require("../controllers/auth");
const { isLoggedOut, isLoggedIn } = require("../middlewares/route-guard");

const router = require("express").Router();
/* SIGNUP */
router.get("/signup", isLoggedOut, (req,res) => res.render("auth/signup"));

router.post("/signup", isLoggedOut, signup);

/* LOGIN (falta middleware islogged)*/
router.get("/login", isLoggedOut, (req,res) => res.render("auth/login"));

router.post("/login", isLoggedOut, login);

router.get("/userProfile", isLoggedIn, (req, res) => {
    res.render("users/user-profile", { userInSession: req.session.currentUser });
});

//                     .: ADDED :.
router.post("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
  