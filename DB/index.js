const mongoose = require("mongoose");

const username ="hebaabdullah125"|| process.env.DB_USERNAME;
const password = "krLgpuHGCSxhmbXo"||process.env.DB_PASSWORD;

// const uri = `mongodb+srv://${username}:${password}@cluster0.szw5x0x.mongodb.net/?retryWrites=true&w=majority`;
const uri =`mongodb+srv://${username}:${password}@cluster0.0kqzqwz.mongodb.net/?retryWrites=true&w=majority`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log('Database connected successfully');
});