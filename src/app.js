const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// setup handle bars and views location

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
      res.render("index", {
            title: "Weather",
            name: "Damian Chanas",
      });
});
app.get("/about", (req, res) => {
      res.render("about", {
            title: "About me",
            name: "Damian Chanas",
      });
});
app.get("/help", (req, res) => {
      res.render("Help", {
            message: "D.C",
            title: "Help",
            name: "Damian Chanas",
      });
});
app.get("/weather", (req, res) => {
      if (!req.query.address) {
            return res.send({
                  error: "You must provide an address!",
            });
      }
      geocode(
            req.query.address,
            (error, { latitude, longitude, location } = {}) => {
                  if (error) {
                        return res.send({ error });
                  }
                  forecast(latitude, longitude, (error, forecastData) => {
                        if (error) {
                              return res.send({ error });
                        }
                        res.send({
                              forecast: forecastData,
                              location,
                              address: req.query.address,
                        });
                  });
            }
      );
});

app.get("/products", (req, res) => {
      if (!req.query.search) {
            return res.send({
                  error: "You must provide search term",
            });
      }
      console.log(req.query.search);
      res.send({
            products: [],
      });
});

app.get("/help/*", (req, res) => {
      res.render("articleNot", {
            title: "Article",
            name: "Damian Chanas",
            error: "ERROR",
            errorMessage: "Help article not found",
      });
});
app.get("*", (req, res) => {
      res.render("404", {
            title: 404,
            name: "Damian Chanas",
            error: "ERROR",
            error404: "My 404 page",
      });
});

app.listen(3000, () => {
      console.log("Server is up on port 3000.");
});
