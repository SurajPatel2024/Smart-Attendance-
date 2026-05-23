const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

connectDB();

/* VIEW ENGINE */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* STATIC FOLDER */
app.use(express.static(path.join(__dirname, "public")));

/* BODY PARSER */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* METHOD OVERRIDE */
app.use(methodOverride("_method"));

/* FLASH MESSAGE */
app.use((req, res, next) => {
    res.locals.message = "";
    res.locals.type = "";
    next();
});

/* ROUTES */
app.use("/", require("./routes/studentRoutes"));

/* SERVER */
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
});