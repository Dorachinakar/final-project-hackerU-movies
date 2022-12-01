const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  port = 3000;
const userRoute = require("./routes/user");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

mongoose
  .connect("mongodb://0.0.0.0:27017/final-project-movies")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));






