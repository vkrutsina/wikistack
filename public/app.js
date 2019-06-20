var morgan = require('morgan');
const html = require('../views/layout');
const express = require('express');
const router = express.Router();
const app = express();
router.use(express.urlencoded({ extended: false }));
const { db } = require('./models');
const wiki = require('./routes/wiki');
const user = require('./routes/user');

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use('/wiki', wiki);
app.use('/user', user);

app.get('/', (req, res, next) => {
  res.send(html(''));
});

const PORT = 3000;

async function connect() {
  try {
    await db.sync({ force: true });
    //where do stuff
    await db.close();
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
}

connect();
