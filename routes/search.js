const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  Referer: "https://banglaplex.fun/",
};

router.get("/search/:query", async (req, res) => {
  const url = "https://banglaplex.fun/search/?q=" + req.params.query;

  await axios.get(url, { headers: headers }).then(async (response) => {
    const $ = cheerio.load(response.data);
    const results = [];
    $(".movie-container")
      .find("div.col-md-2.col-sm-3.col-xs-6")
      .each((i, el) => {
        const title = $(el).find(".movie-title").text().trim();
        const imdb =
          $(el).find(".imdb-rating").text().trim().split(" ")[1] || null;
        const quality = $(el).find(".video_quality_movie").text().trim();
        const movieYear = $(el).find(".video_year_movie").text().trim();
        const url = $(el).find("a").attr("href").split("/");
        const modUrl =
          url[3] + "/" + url[4].replace(".html", "").replace(".html", "");
        const image = $(el).find(".latest-movie-img-container").attr("style");
        const matches = /url\(['"]?([^'"]+)['"]?\)/.exec(image);
        const imageUrl = matches[1];

        results.push({
          title: title,
          imdb: imdb,
          quality: quality,
          movieYear: movieYear,
          image: imageUrl,
          url: "/" + modUrl,
        });
      });
    res.send(results);
  });
});

module.exports = router;
