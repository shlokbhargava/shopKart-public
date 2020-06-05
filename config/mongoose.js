const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopkart_development');

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', () => {
    console.log('Connected to database :: MongoDB')
});

module.exports = db;