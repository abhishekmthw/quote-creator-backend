const express = require("express");
const router = express.Router();
const textToImage = require("text-to-image");

router.get("/download/:quote/:colorString", async (req, res) => {
  console.log("API call hit! Params:", req.params);
  try {
    const { fontSize, lineHeight } = calculateDimension(req.params.quote);
    await textToImage.generate(req.params.quote, {
      debug: true,
      debugFilename: "./downloads/quote.png",
      maxWidth: 1000,
      customHeight: 500,
      fontSize,
      lineHeight,
      fontFamily: "Lato",
      fontPath: "./Lato-BoldItalic.ttf",
      bgColor: "black",
      textColor: req.params.colorString,
      textAlign: "center",
      verticalAlign: "center",
    });
    res.download("./downloads/quote.png");
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
});

function calculateDimension(quote) {
  let fontSize;
  let lineHeight;
  if (quote.length < 25) {
    lineHeight = 180;
    fontSize = 150;
  } else if (quote.length < 75) {
    lineHeight = 120;
    fontSize = 100;
  } else {
    lineHeight = 100;
    fontSize = 75;
  }
  return { fontSize, lineHeight };
}

module.exports = router;
