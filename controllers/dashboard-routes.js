const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, (req, res) => {
  Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
   
    include: [
     
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbBlogData) => {
      const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
      res.render('dashboard', {
        blogs,
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/edit/:id', withAuth, (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
  
    include: [
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
      console.log('sending ' + req.session.username);
      res.render('edit-blog', {
        blog,
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
