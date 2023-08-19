// Auth routes
import express from "express";
import {
  renderLogin,
  renderRegister,
  registerUser,
  authenticateUser,
  renderLogout,
} from "../../controller/Authentication.js";

const router = express.Router();

// GET /: Render the login page
router.get("/", renderLogin);
// GET /: Render the login page
router.get("/register", renderRegister);
// POST /register: Register a new recruiter account
router.post("/register", registerUser);
// POST /login: Log in as a recruiter
router.post("/login", authenticateUser);
// POST /logout: Log out the currently logged-in recruiter
router.get("/logout", renderLogout);

export default router;
