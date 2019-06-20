var morgan = require('morgan');
const html = require('../views/layout');
const express = require('express');
const router = express.Router();
const app = express();
router.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send(html(''));
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
