const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

exports.myFunction = async (event) => {
  try {
    // Loop through the records in the S3 event
    for (const record of event.Records) {
      const bucket = record.s3.bucket.name;
      const key = record.s3.object.key;

      // Check if the image is already in the 'thumbnail' folder
      if (key.startsWith('thumbnail/')) {
        console.log(`Skipping thumbnail creation for: ${key}`);
        continue; // Skip processing if the image is already a thumbnail
      }

      // Get the image from S3
      const params = {
        Bucket: bucket,
        Key: key,
      };
      const { Body } = await s3.getObject(params).promise();

      // Resize the image using sharp
      const resizedImageBuffer = await sharp(Body)
        .resize(200, 200) // Resize to 200x200 pixels
        .toBuffer();

      // Create a new key for the thumbnail image
      const thumbnailKey = `thumbnail/${key}`;

      // Upload the resized image back to S3
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: thumbnailKey,
        Body: resizedImageBuffer,
        ContentType: 'image/jpeg', // Adjust based on the original image type
      };
      await s3.putObject(uploadParams).promise();
      console.log(`Thumbnail created: ${thumbnailKey}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify('Thumbnail created successfully'),
    };
  } catch (error) {
    console.error('Error processing S3 event:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error processing S3 event'),
    };
  }
};
