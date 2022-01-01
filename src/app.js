const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const apiKey = process.env.WEATHER_APP_API_KEY;
const baseUrl = "http://api.weatherapi.com/v1/";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => res.json({ message: "hello" }));

app.get("/api/search/:q", (req, res) => {
	const { q: query } = req.params;

	axios
		.get(`${baseUrl}search.json?key=${apiKey}&q=${query}`)
		.then((response) => res.json(response.data))
		.catch((err) => console.log(err));
});

app.get("/api/current/:long&:lat", (req, res) => {
	const { long, lat } = req.params;
	console.log(long, lat);
	axios
		.get(
			`${baseUrl}forecast.json?key=${apiKey}&q=${lat},${long}&days=1&aqi=no&alerts=no`
		)
		.then((response) => res.json(response.data))
		.catch((err) => console.log(err));
});

app.all("*", (req, res) => {
	res.json({
		message: "Page not found",
	});
});

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
