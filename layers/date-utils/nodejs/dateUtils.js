const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0]; // Returns current time in HH:mm:ss format
};

module.exports = { getCurrentTime };