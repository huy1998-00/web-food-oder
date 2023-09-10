const functions = require("firebase-functions");

const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");

const app = express();

//body parser

app.use(express.json());

//CORS
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// API endpoint=======================

app.get("/", (req, res) => {
  return res.send("hello");
});

// user route

const userRoute = require("./routes/users");

app.use("/api/users", userRoute);

//============
exports.app = functions.https.onRequest(app);
