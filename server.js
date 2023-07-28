const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const dotenv = require('dotenv');
// configure .env file (config.env file)
dotenv.config({ path: './config/.env' });

const cors = require('cors');
const transactionsRoute = require('./routes/transactionsRoute');

connectDB();

const app = express();

// app.use(cors()); // empty object = default = all origins
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

// (middleware which allows us to use the body parser in controllers (req.body/query.xxx)
app.use(express.json());
// alternatively we can use form with this middleware
// app.use(express.urlencoded({extended: false}));//

// morgan
if (process.env.NODE_ENV === 'development') {
  // available to us in every single file in the project
  app.use(morgan('dev')); // will not be used when we switch to prod
}

// create a route
// app.get('/', cors(corsOptions), (req, res) => {
//   res.json({ msg: `This is CORS-enabled for ${corsOptions.origin}` });
// });
app.get('/', (req, res) => {
  res.json({ msg: `This is CORS-enabled for http://localhost:${process.env.CLIENT_PORT || 3000}` });
});

app.use('/api/v1/transactions', transactionsRoute);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, console.log(`CORS-enabled server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
