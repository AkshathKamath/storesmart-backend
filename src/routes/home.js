const express = require("express");
const router = express.Router();
const axios = require("axios");

//Home route
router.get("/", (req, res) => {
  try {
    res.redirect("/home");
  } catch (err) {
    console.error("Error rendering home page!", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/home", async (req, res) => {
  try {
    const response = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/check"
    );
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error("Error rendering home page!", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
