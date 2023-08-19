import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import path from "path";
import { authSession } from "./middleware/index.js";
import { authRoutes, jobRoutes } from "./routes/index.js";

const app = express();

app.use("/uploads", express.static(path.resolve("uploads")));
app.use(express.static(path.resolve("views")));
// app.use(express.static(path.resolve("views", "assets")));

app.use(
  session({
    secret: "topsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use("/auth", authRoutes);
app.use("/jobs", authSession, jobRoutes); // add authSession Middleware

app.get("/", (req, res) => {
  res.render("index");
});

// add authSession Middleware
app.get("/dashboard", authSession, (req, res) => {
  res.render("dashboard", {
    page: "home",
    data: { Name: req.cookies.userName },
    user: {
      name: req.cookies.userName,
      email: req.cookies.userEmail,
      usertype: req.cookies.userType,
    },
  });
});

app.get("*", (req, res) => {
  res.render("404page");
});

export default app;
