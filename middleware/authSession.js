const authSession = (req, res, next) => {
  if (req.session.userEmail) next();
  else res.redirect("/auth");
};

export default authSession;
