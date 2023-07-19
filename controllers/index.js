const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes=require("./dashboard-routes")

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use("/dashboard", dashRoutes)
module.exports = router;