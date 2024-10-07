const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
  region: 'us-east-1', // Set your AWS region
});

const invokeLambda = async () => {
  const promises = [];
  for (let i = 0; i < 1; i++) {
    const params = {
      FunctionName: 'lambda-email-failure-demo-dev-mainFunction', 
      InvocationType: 'Event',  // for async invocation
      // InvocationType: 'RequestResponse', 
      Payload: JSON.stringify({}),
    };

    promises.push(
      lambda.invoke(params).promise().then((response) => {
        if (params.InvocationType === 'Event') {
          console.log(`Call ${i + 1}: Async invocation initiated ${JSON.stringify(response)} `);
        } else if (response.StatusCode === 200) {
          console.log(`Call ${i + 1}: Success ${JSON.stringify(response)}`);
        } else {
          console.log(`Call ${i + 1}: Failed with status ${response.StatusCode} ${JSON.stringify(response)}`);
        }
      }).catch((error) => {
        if (error.code === 'ThrottlingException') {
          console.error(`Call ${i + 1}: Throttled`, error);
        } else {
          console.error(`Call ${i + 1}: Failed`, error);
        }
      })
    );
  }

  await Promise.all(promises);
};

invokeLambda();
