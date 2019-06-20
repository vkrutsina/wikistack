const express = require('express');
const html = require('../../views/layout');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../../views');
module.exports = router;

router.get('/', (req, res, next) => {
  res.send(html(''));
});
router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    res.json(page);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// router.post("/add", (req, res) => {
//   res.json(req.body);
// });
