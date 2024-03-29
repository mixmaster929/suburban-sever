const express = require('express');
const router = express.Router();
const WLAddr = require('../models/wlAddr');

router.get('/', (req, res, next) => {
    res.send("App is working");
});

router.get('/find', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  console.log('find')
  WLAddr.find()
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/register', (req, res, next) => {
  if (req.body.address) {
    WLAddr.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

// router.delete('/todos/:id', (req, res, next) => {
//     WLAddr.findOneAndDelete({ _id: req.params.id })
//     .then((data) => res.json(data))
//     .catch(next);
// });

module.exports = router;