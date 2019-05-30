var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");

// lomma, borrby, kämpinge, lundåkra
router.get("/:spot", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://findwind.se/spot/" + req.params.spot
    );
    const $ = cheerio.load(response.data);

    let result = {};
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
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

module.exports = router;
