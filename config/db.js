const mongoose = require('mongoose');

// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true, // error: option not supported
      useUnifiedTopology: true,
    });
    console.log(`DB connection successful on host:${conn.connection.host}`.cyan.bold);
    console.log(`DB name: ${conn.connection.name}`.green.bold);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    console.log('shutting down');
    process.exit(1);
  }
};

module.exports = connectDB;
