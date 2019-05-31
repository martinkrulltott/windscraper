var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");

router.get('/', (req, res) => res.json({error: "No input parameter! Please provide the name of a wind spot in the URL, e.g. /lomma"}));
router.get("/:spot", async (req, res, next) => {
  try {
    let result = {};
    const sourceUrl = "https://findwind.se/spot/" + req.params.spot;
    result.link = sourceUrl;
    const response = await axios.get(sourceUrl);
    const $ = cheerio.load(response.data);
    
    const spot = $(".spotcard_header_center_1 a");
    if (spot) {
      result.spot = $(spot).text();
      // Note: To pick up incorrect spots (which return "En okänd spot"), this will be empty
      // However, correct spots with spaces will also fail because of this
    }
    const windspeed = $(".spotcard_main_center_table_2");
    if (windspeed) {
      result.windspeed = $(windspeed).text();
    }
    const gustspeed = $(".spotcard_main_right_1 .spotcard_main_right_table_2");
    if (gustspeed) {
      result.gustspeed = $(gustspeed).text();
    }
    const direction = $(".spotcard_main_left_1 .spotcard_main_left_table_1");
    if (direction) {
      let text = $(direction).text();
      result.directiontext = text.match(/[A-Z]+/gm)[0];
      result.directiondegrees = text.match(/[0-9]+/gm)[0];
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
