//Jonathan Cardenas - Lab7
//Connection to MongoDB
const Mongoose = require("mongoose");

const connectionURL = "FOR GUTHUB PURPOSES, THE CONNECTION URL IS NOT HERE";

Mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
});