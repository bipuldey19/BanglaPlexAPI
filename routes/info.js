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

router.get("/watch/:id", async (req, res) => {
  const url = "https://banglaplex.fun/watch/" + req.params.id + ".html";
  const response = await axios.get(url, { headers: headers });
  const $ = cheerio.load(response.data);
  const title = $(".title").text().trim();

  if (title) {
    const description =
      $(".col-md-9 .col-md-12 p:nth-of-type(2)").text().trim() || "";
    const image = $(".col-md-3 img").attr("src") || "";
    const duration =
      $("div.col-md-6:nth-of-type(2) p:nth-of-type(1)")
        .text()
        .trim()
        .split(":") || "";
    const imdb =
      $("div.col-md-6:nth-of-type(2) p:nth-child(4)").text().trim() || "";
    const release =
      $(".col-md-6.text-left p:nth-child(6)").text().trim().split(":") || "";
    const genre =
      $("div.col-md-6:nth-of-type(1) p:nth-of-type(1)")
        .text()
        .trim()
        .replace("Genre:", "")
        .replace(/\n/g, "")
        .trim() || "";
    const actor =
      $("div.col-md-6:nth-of-type(1) p:nth-of-type(2)")
        .text()
        .trim()
        .replace("Actor:", "")
        .replace(/\n/g, "")
        .trim() || "";
    const director =
      $("div.col-md-6:nth-of-type(1) p:nth-of-type(3)")
        .text()
        .trim()
        .replace("Director:", "")
        .replace(/\n/g, "")
        .trim() || "";
    const writer =
      $("div.col-md-6:nth-of-type(1) p:nth-of-type(4)")
        .text()
        .trim()
        .replace("Writer:", "")
        .replace(/\n/g, "")
        .trim() || "";
    const country =
      $("div.col-md-6:nth-of-type(1) p:nth-of-type(5)")
        .text()
        .trim()
        .replace("Country:", "")
        .replace(/\n/g, "")
        .trim() || "";
    const quality = $("p span.label").text().trim() || "";
    const video = $("iframe").attr("src") || result.url;

    function formatDownloadLink(link) {
      return link.replace(/-/, "").replace(/-/, " (").replace(/-/, ") - ");
    }
    const downloadLinks = $("#download a").map(function () {
      const href = $(this).attr("href");
      const dlServer = $(this).text().toUpperCase();
      return {
        dlServer: formatDownloadLink(dlServer),
        dlUrl: href,
      };
    });
    const downloadLinksArray = downloadLinks.get();

    res.send({
      title: title,
      description: description,
      genre: genre,
      actor: actor,
      director: director,
      writer: writer,
      country: country,
      imdb: imdb || "",
      image: image,
      duration: duration[1].trim() || "",
      release: release[1].trim(),
      quality: quality,
      stream: video,
      downloadLinks: downloadLinksArray,
    });
  }
});

module.exports = router;
