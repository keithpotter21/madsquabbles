var express = require('express');
var router = express.Router();

/* GET roster listing. */
router.get('/', function(req, res, next) {
  res.render('schedule', { title: 'Mad Squabbles - Schedule', pageTitle: 'Schedule' });
});

module.exports = router;
