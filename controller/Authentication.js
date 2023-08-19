import {
  userRegisteration,
  userAuthentication,
  getProfession,
} from "../model/userBase.js";

const renderLogin = (req, res, next) => {
  res.render("login", { error: false });
};

const renderRegister = (req, res, next) => {
  res.render("register");
};

const registerUser = (req, res, next) => {
  const status = userRegisteration(req.body);
  if (status) res.redirect("/auth");
};

const authenticateUser = (req, res, next) => {
  const isAuth = userAuthentication(req.body);
  if (isAuth) {
    req.session.userEmail = req.body.email;
    const { name, email, usertype } = getProfession(req.body);
    res.cookie("userEmail", email, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.cookie("userName", name, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.cookie("userType", usertype, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/dashboard");
  } else {
    res.redirect("/auth");
  }
};

const renderLogout = (req, res, next) => {
  req.session.destroy(function (err) {
    res.clearCookie("userName");
    res.clearCookie("userEmail");
    res.clearCookie("userType");
    res.redirect("/");
  });
};

export {
  renderLogin,
  renderRegister,
  registerUser,
  authenticateUser,
  renderLogout,
};
