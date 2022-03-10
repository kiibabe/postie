const path = require("path");
const PATH = process.env.PORT || 5000;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require('cors');

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://admin_postie:AqE9idFuOhxYHvA9@cluster0.nkjbx.mongodb.net/postie?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

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

app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

const corsOptions = {
  origin: "https://postie-cse341.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4
};

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(PATH);
  })
  .catch((err) => {
    console.log(err);
  });
