const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

app.use("/css", express.static(path.join(__dirname, "static", "css")));
app.use("/images", express.static(path.join(__dirname, "static", "images")));
app.use(
  "/javascripts",
  express.static(path.join(__dirname, "static", "javascripts"))
);
app.use("/vendors", express.static(path.join(__dirname, "static", "vendors")));

app.set("view engine", "hbs");

app.get("/", function (req, res) {
  res.render("mytodo.hbs", {
    title: "Мои задачи",
  });
});

app.get("/calendar", function (req, res) {
  res.render("calendarTodo.hbs", {
    title: "Мой календарь",
  });
});

app.listen(3000);
