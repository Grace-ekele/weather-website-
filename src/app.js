const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
const view = path.join(__dirname, "../templates/viwes");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

// setup handlerbars engin and viwes location
app.set("view engine", "hbs");
app.set("views", view);

// Route that renders a view
app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Grace",
  }); // Renders the 'index.hbs' file in the views directory
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "Grace Ekele",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    message: "what do you need help with?",
    name: "grace",
  });
});

app.get("/footer", (req, res) => {
  res.render("footer", {
    nmae: " grace ekele",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });

  
});
app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search team",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "grace",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "grace",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
