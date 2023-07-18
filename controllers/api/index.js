const router = require('express').Router();
const userroutes = require('./userRoutes');
const blogPostroutes = require('./blogRoutes');

router.use('/Users', userroutes);
router.use('/blogPost', blogPostroutes);

module.exports = router;