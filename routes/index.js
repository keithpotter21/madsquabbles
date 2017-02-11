var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

var now = new Date();
var startDate = now.getTime();
var endDate = startDate + 7*86400000;


/* GET home page. */
router.get('/', function(req, res, next) {
  var db = firebase.database();
  var ref = db.ref("/schedule/games");

  ref.orderByChild("date").startAt(startDate).endAt(endDate)
      .on("child_added", function(snapshot){
        console.log("got the data!", snapshot);
      });


  ref.orderByChild("timestamp").startAt(startDate).endAt(endDate)
      .limitToFirst(1)
      .once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if(data) {
          console.log(data);
          res.render('index', {title: 'Mad Squabbles - Home Page', pageTitle: 'Spring 2017 Full Schedule', nextGame: data});
        } else {
          res.status(401).json({error: 'No games found'});
        }
      });
});

module.exports = router;
