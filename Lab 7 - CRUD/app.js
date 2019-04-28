//Jonathan Cardenas - Lab7
const express = require("express");
require("./db/mongoose");

const router = require("./controllers/routes");

const port = 3000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(port, function() {
  console.log("Up and running");
});