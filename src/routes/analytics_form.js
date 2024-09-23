const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const aws = require("aws-sdk");
const config = require("../../config");

//Config Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Post req
router.post("/", upload.single("file"), async (req, res) => {
  try {
    //Upload file to S3 bucket
    //Config AWS
    aws.config.update({
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
      region: config.awsRegion,
    });

    const s3 = new aws.S3();

    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const params = {
      Bucket: config.s3BucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file.");
      }
    });

    console.log("File upload successful!");

    //Use uploaded file to store cleaned df to Mongo Atlas
    const response = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/clean"
    );
    const data = response.data;

    res.json(data.msg);
  } catch (err) {
    console.error("Error uploading file!", err);
    res.status(500).send("Internal Server Error");
  }
});

//Get req
router.get("/", async (req, res) => {
  try {
    const response1 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/size"
    );
    const data1 = response1.data;
    const response2 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/general/1"
    );
    const data2 = JSON.parse(response2.data);
    const response3 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/general/2"
    );
    const data3 = JSON.parse(response3.data);
    const response4 = await axios.get(
      "https://storesmart-analyticsapi-production.up.railway.app/show/general/3"
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
