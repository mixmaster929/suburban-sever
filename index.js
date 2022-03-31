const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const cors = require('cors')
require('dotenv').config();

const app = express();

const port = 5000;


// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); */

app.use(
  cors({
      origin: true,
      credentials: true,
  })
);

app.use(bodyParser.json());

app.use('/server/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

// Connect to the database
mongoose
  .connect('mongodb://localhost:27017/', { useNewUrlParser: true})
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected successfully`)
      console.log(`Server running on port ${port}`);
    });
  } )
  .catch((err) => console.log(err));

