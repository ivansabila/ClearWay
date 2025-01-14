const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const routers = require("./routes");

const app = express();

// View engine
app.set("views", path.resolve("src/views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

dotenv.config();

app.use(
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 60 * 1000,
            secure: false,
        },
    })
);

app.use(routers);

module.exports = app;
