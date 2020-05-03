
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB opened successfully");
});

const usersRouter = require("./routes/users")
const groupsRouter = require("./routes/groups")

app.use("/groups", groupsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})