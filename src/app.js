import express from "express";
import gotWeather from "./utils/geocode.js";
import getWeather from "./utils/forecast.js";
console.log("getWeather");
import hbs from "hbs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { request } from "http";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "..", "templates/views"));
const partialPath = path.join(__dirname, "..", "templates/partials");

hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  const { adress } = req.query;
  if (!adress) {
    return res.render("index", {
      name: "@roman atamanchuk",
      weather: "please provide location",
      title: "weather",
    });
  }

  gotWeather(adress, async (er, { long, lat } = {}) => {
    if (er) return res.send(er);
    const data = await getWeather(lat, long);

    if (adress.toLowerCase() !== data.location.name.toLowerCase()) {
      return res.render("index", {
        name: "@roman atamanchuk",
        weather: `${adress} not found`,
        title: "weather",
      });
    }
    res.render("index", {
      name: "@roman atamanchuk",
      location: data.location.name.toUpperCase(),
      weather: `it is currently ${data.current.temperature}.it feels like ${data.current.feelslike} degrees out.${data.current.weather_descriptions[0]}.There is a ${data.current.precip}% chance of rain`,
      title: "weather",
    });
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "@roman atamanchuk",
    text: "some helpful text",
    title: "help page",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { name: "@roman atamanchuk", title: "about page" });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    error: "help page not found",
    title: "error page",
    name: "@roman atamanchuk",
  });
});
app.all("*", (req, res) => {
  res.render("error", {
    error: "404.PAGE NOT FOUND",
    title: "error page",
    name: "@roman atamanchuk",
  });
});
app.listen(3000, () => console.log("listening on port 3000"));
