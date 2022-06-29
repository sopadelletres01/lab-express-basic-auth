const index = require("express").Router();
const { isLoggedIn } = require("../middlewares/route-guard");
const auth = require("./auth")
/* GET home page */
index.get("/", isLoggedIn, (req, res, next) => {
  res.render("index");
});

index.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private");
});

index.get("/main", isLoggedIn, (req, res, next) => {
  res.render("main");
});


module.exports = {
  auth,
  index
};
