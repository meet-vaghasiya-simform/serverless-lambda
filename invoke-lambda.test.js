const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
  region: 'us-east-1', // Set your AWS region
});

const invokeLambda = async () => {
  const promises = [];
  for (let i = 0; i < 100; i++) {
    const params = {
      FunctionName: 'my-service-dev-myFunction', // Replace with your function name
      InvocationType: 'Event', 
      Payload: JSON.stringify({}),
    };

    promises.push(
      lambda.invoke(params).promise().then((response) => {
        if (response.StatusCode === 200) {
          console.log(`Call ${i + 1}: Success`);
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
