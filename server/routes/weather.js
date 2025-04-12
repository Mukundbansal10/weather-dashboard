const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    const { city } = req.query;

    if (!city || city.trim() === "") {
        return res.status(400).json({ error: "City name is required." });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const { data } = await axios.get(apiURL);

        const weather = {
            location: data.name,
            temp: data.main.temp,
            condition: data.weather[0].main,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind: data.wind.speed,
        };

        res.status(200).json(weather);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch weather. Check city name." });
    }
});

module.exports = router;
