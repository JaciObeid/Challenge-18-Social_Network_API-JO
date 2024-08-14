const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
//This will show up if you try and call a route that doesn't have anything on it
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;