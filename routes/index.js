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

router.get("/trending", async (req, res) => {
  await axios
    .get("https://banglaplex.fun/type/trending", { headers: headers })
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const trending = [];
      $(".movie-container")
        .find("div.col-md-2.col-sm-3.col-xs-6")
        .each((i, el) => {
          const title = $(el).find(".movie-title").text().trim();
          const imdb =
            $(el).find(".imdb-rating").text().trim().split(" ")[1] || null;
          const quality = $(el).find(".video_quality_movie").text().trim();
          const movieYear = $(el).find(".video_year_movie").text().trim();
          const url = $(el).find("a").attr("href").split("/");
          const modUrl = url[3] + "/" + url[4].replace(".html", "");
          const image = $(el).find(".latest-movie-img-container").attr("style");
          const matches = /url\(['"]?([^'"]+)['"]?\)/.exec(image);
          const imageUrl = matches[1];

          trending.push({
            title: title,
            imdb: imdb,
            quality: quality,
            movieYear: movieYear,
            image: imageUrl,
            url: "/" + modUrl,
          });
        });
      res.send(trending);
    });
});

router.get("/latest", async (req, res) => {
  await axios
    .get("https://banglaplex.fun", { headers: headers })
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const latest = [];
      $("#latest-all .movie-container")
        .find("div.col-md-2.col-sm-3.col-xs-6")
        .each((i, el) => {
          const title = $(el).find(".movie-title").text().trim();
          const imdb =
            $(el).find(".imdb-rating").text().trim().split(" ")[1] || null;
          const quality = $(el).find(".video_quality_movie").text().trim();
          const movieYear = $(el).find(".video_year_movie").text().trim();
          const url = $(el).find("a").attr("href").split("/");
          const modUrl = url[3] + "/" + url[4].replace(".html", "").replace(".html", "");
          const image = $(el).find(".latest-movie-img-container").attr("style");
          const matches = /url\(['"]?([^'"]+)['"]?\)/.exec(image);
          const imageUrl = matches[1];

          latest.push({
            title: title,
            imdb: imdb,
            quality: quality,
            movieYear: movieYear,
            image: imageUrl,
            url: "/" + modUrl,
          });
        });
      res.send(latest);
    });
});

router.get("/latest/:page", async (req, res) => {
  const page = req.params.page;
  await axios
    .get(`https://banglaplex.fun/`, { headers: headers })
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const latest = [];
      $(`#${page} .movie-container`)
        .find("div.col-md-2.col-sm-3.col-xs-6")
        .each((i, el) => {
          const title = $(el).find(".movie-title").text().trim();
          const imdb =
            $(el).find(".imdb-rating").text().trim().split(" ")[1] || null;
          const quality = $(el).find(".video_quality_movie").text().trim();
          const movieYear = $(el).find(".video_year_movie").text().trim();
          const url = $(el).find("a").attr("href").split("/");
          const modUrl = url[3] + "/" + url[4].replace(".html", "");
          const image = $(el).find(".latest-movie-img-container").attr("style");
          const matches = /url\(['"]?([^'"]+)['"]?\)/.exec(image);
          const imageUrl = matches[1];

          latest.push({
            title: title,
            imdb: imdb,
            quality: quality,
            movieYear: movieYear,
            image: imageUrl,
            url: "/" + modUrl,
          });
        });
      res.send(latest);
    });
});

router.get("/popular", async (req, res) => {
  await axios
    .get("https://banglaplex.fun", { headers: headers })
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const popular = [];
      $("#hot .movie-container")
        .find("div.col-md-2.col-sm-3.col-xs-6")
        .each((i, el) => {
          const title = $(el).find(".movie-title").text().trim();
          const imdb =
            $(el).find(".imdb-rating").text().trim().split(" ")[1] || null;
          const quality = $(el).find(".video_quality_movie").text().trim();
          const movieYear = $(el).find(".video_year_movie").text().trim();
          const url = $(el).find("a").attr("href").split("/");
          const modUrl = url[3] + "/" + url[4].replace(".html", "");
          const image = $(el).find(".latest-movie-img-container").attr("style");
          const matches = /url\(['"]?([^'"]+)['"]?\)/.exec(image);
          const imageUrl = matches[1];

          popular.push({
            title: title,
            imdb: imdb,
            quality: quality,
            movieYear: movieYear,
            image: imageUrl,
            url: "/" + modUrl,
          });
        });
      res.send(popular);
    });
});

router.get("/popular/:page", async (req, res) => {
  const page = req.params.page;
  await axios
    .get(`https://banglaplex.fun/`, { headers: headers })
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const popular = [];
      $(`#top-${page} .movie-container`)
        .find("div.col-md-2.col-sm-3.col-xs-6")
        .each((i, el) => {
          const title = $(el).find(".movie-title").text().trim();
          const imdb =
            $(el).find(".imdb-rating").text().trim().split(" ")[1] || null;
          const quality = $(el).find(".video_quality_movie").text().trim();
          const movieYear = $(el).find(".video_year_movie").text().trim();
          const url = $(el).find("a").attr("href").split("/");
          const modUrl = url[3] + "/" + url[4].replace(".html", "");
          const image = $(el).find(".latest-movie-img-container").attr("style");
          const matches = /url\(['"]?([^'"]+)['"]?\)/.exec(image);
          const imageUrl = matches[1];

          popular.push({
            title: title,
            imdb: imdb,
            quality: quality,
            movieYear: movieYear,
            image: imageUrl,
            url: "/" + modUrl,
          });
        });
      res.send(popular);
    });
});

module.exports = router;
