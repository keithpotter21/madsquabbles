var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

var now = new Date();
var startDate = Math.floor(now.getTime()/1000);
var endDate = startDate + 7*86400;

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = firebase.database();
  var ref = db.ref("/schedule/games");
  ref.orderByChild("timestamp").startAt(startDate).endAt(endDate)
      .limitToFirst(1)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if(data) {
          console.log(data);
          res.render('index', {title: 'Mad Squabbles - Home Page', pageTitle: 'Spring 2017 Full Schedule', nextGame: data});
        } else {
            res.render('index', {title: 'Mad Squabbles - Home Page', pageTitle: 'Spring 2017 Full Schedule', nextGame: {error: 'No games found'}});
        }
      });
});

module.exports = router;
