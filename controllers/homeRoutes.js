const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const router = require('express').Router();
// console.log('**************' + req.session.username);
router.get('/', (req, res) => {
  Blog.findAll({
  
    include: [
      {
        model: Comment,
  
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbBlogData) => {
      const blog = dbBlogData.map((blog) => blog.get({ plain: true }));
      res.render('homepage', {
        blog,
        logged_in: req.session.logged_in,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/blog/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },

    include: [
      {
        model: Comment,
       
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbBlogData) => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const blog = dbBlogData.get({ plain: true });
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/blog-comments', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbBlogData) => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render('blog-comments', {
        post,
        logged_in: req.session.logged_in,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
