const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  port = 3001;
const cors = require("cors");
const userRoute = require("./routes/user");
const noteRoute = require("./routes/notes");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/notes", noteRoute);

mongoose
  .connect("mongodb://0.0.0.0:27017/final-project-movies")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
