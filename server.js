
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
var session = require('express-session');
var cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
 

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cookieParser());

app.set('view engine', 'ejs');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB opened successfully");
});

app.use(session({secret: process.env.SECRET_KEY ,saveUninitialized : false, resave : false, name: "app.sid", store: new MongoStore({mongooseConnection: mongoose.connection})}));

const { usersRouter } = require("./routes/users")
const groupsRouter = require("./routes/groups")

app.use("/groups", groupsRouter);
app.use("/users", usersRouter);

app.get('/', function (req, res) {
    res.render("pages/index")
  });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})