var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get('/', (req, res) => res.json({error: "No input parameter! Please provide the name of a spot ID in the URL, e.g. /20"}));
router.get('/favicon.ico', (req, res) => res.status(204));
router.get("/:spot", async (req, res, next) => {
  try {
    const USERNAME = process.env.USERNAME;
    const API_KEY = process.env.API_KEY;
    const sourceUrl = "https://www.findwind.se/api/json?email=" + USERNAME + "&psw=" + API_KEY + "&m=s1&sp=" + req.params.spot;
    const response = await axios.get(sourceUrl);
    const stats = response.data;
    const result = {
      name: stats.Name,
      link: stats.API_JSON_Return_Url,
      windspeed: stats.WindSpeed,
      gustspeed: stats.Gust,
      directiontext: stats.WindDirection_Name,
      directiondegrees: stats.WindDirection,
      temperature: stats.Temperature
    }
    res.json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
