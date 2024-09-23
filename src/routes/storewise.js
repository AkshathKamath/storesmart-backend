const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response1 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/size"
    );
    const data1 = response1.data;
    const response2 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/storewise/1"
    );
    const data2 = JSON.parse(response2.data);
    const response3 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/storewise/2"
    );
    const data3 = JSON.parse(response3.data);
    const response4 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/storewise/3"
    );
    const data4 = JSON.parse(response4.data);

    const data = {
      ...data1,
      list1: data2,
      list2: data3,
      list3: data4,
    };

    console.log("API connection success!");
    res.json(data);
  } catch (err) {
    console.error("Error in API connection!", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
