const express = require('express');
const html = require('../../views/layout');
const router = express.Router();
const { Page, User } = require('../models');
const { addPage, wikiPage } = require('../../views');
module.exports = router;

router.get('/', (req, res, next) => {
  res.send(html(''));
});
router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    console.log('paramsSlug', req.params.slug);
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    console.log('page', page);
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

router.post('/:slug', async (req, res, next) => {
  try {
    const page = await Page.create({ title: req.body.title });
    const author = await User.create({ author: req.body.author });
    res.send(page);
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
    await Page.create(page);
    res.redirect('/wiki/' + page.slug);
  } catch (error) {
    next(error);
  }
});

// router.post("/add", (req, res) => {
//   res.json(req.body);
// });
