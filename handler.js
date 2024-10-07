// handler.js

const { getCurrentTime } = require('/opt/nodejs/dateUtils'); // Import the updated function

module.exports.hello = async (event) => {
    const currentTime = getCurrentTime(); // Call the updated function
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from Lambda!', currentTime }),
    };
};
