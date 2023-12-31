const router = require('express').Router();
const userroutes = require('./userRoutes');
const blogPostroutes = require('./blogRoutes');

router.use('/users', userroutes);
router.use('/blogPost', blogPostroutes);

module.exports = router;