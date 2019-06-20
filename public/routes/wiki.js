const express = require('express');
const router = express.Router();
const addPage = require('../../views/addPage');
module.exports = router;

router.get('/', (req, res) => {
  res.send('got the GET /wiki/');
});

router.post('/', (req, res) => {
  res.send('got to POST /wiki/');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});
