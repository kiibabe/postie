const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://admin_postie:AqE9idFuOhxYHvA9@cluster0.nkjbx.mongodb.net/postie?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
