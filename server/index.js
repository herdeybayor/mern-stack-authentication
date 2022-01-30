require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Create .env file and add SECRET and DB_STRING=mongodb://localhost:27017/mernAuthDB
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

app.use(router);

app.listen(port, () => {
  console.log(`Server started at port ${port}. http://localhost:${port}`);
});
