require("dotenv").config();
const express = require("express");
const app = express();

// google-firebase
var admin = require("firebase-admin");
var serviceAccount = require("./google-firebase");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL,
  storageBucket: process.env.BUCKET_URL,
});

app.locals.bucket = admin.storage().bucket();
// end

module.exports = app.locals.bucket;
