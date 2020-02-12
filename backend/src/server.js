const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack07:omnistack07@omnistack-7-q2tw8.mongodb.net/omnistack09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);
