require("dotenv").config();

const config = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_KEY_ID,
  awsRegion: process.env.AWS_REGION_ID,
  s3BucketName: process.env.AWS_S3_BUCKET_NAME_ID,
};

// console.log(config);

module.exports = config;
