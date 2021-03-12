const express = require("express");
const app = express();
const books = require("./data/db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET DATA
app.get("/", (req, res) => {
  res.json(books);
});

//POST DATA
app.post("/", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
