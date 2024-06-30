const express = require("express");
const router = express.Router();
const axios = require("axios");

//Post req
router.post("/", async (req, res) => {
  try {
    const option = req.body.opt;
    if (option == "gen") res.redirect("/analytics/form");
    else if (option == "store") res.redirect("analytics/store");
    else if (option == "time") res.redirect("analytics/time");
    else res.send("Invalid Option!");
    // res.send(`Value: ${option}`);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
