const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

    if (!mongoUri) {
        throw new Error('MongoDB connection string is missing. Set MONGO_URI in your .env file.');
    }

    const options = {};

    if (process.env.MONGO_DB_NAME) {
        options.dbName = process.env.MONGO_DB_NAME;
    }

    await mongoose.connect(mongoUri, options);
    console.log('MongoDB connected');
};

module.exports = connectDB;
