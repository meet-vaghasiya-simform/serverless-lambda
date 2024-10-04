// handler.js

module.exports.myFunction = async (event) => {
  const bucketName = process.env.BUCKET_NAME; // Access the bucket name from environment variable
  console.log(`Bucket name: ${bucketName}`);
  
  // Add your Lambda function logic here, e.g., processing data
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      bucketName: bucketName
    }),
  };
};
