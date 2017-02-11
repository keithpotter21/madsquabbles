var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

/* GET schedule listing. */
router.get('/', function(req, res, next) {
  var db = firebase.database();
  var ref = db.ref("/schedule/games");

  ref.once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        if(data) {
          console.log(data);
          res.render('schedule', {title: 'Mad Squabbles - Schedule', pageTitle: 'Spring 2017 Full Schedule', schedule: data});
        } else {
          res.status(401).json({error: 'No games found'});
        }
        db.delete();
      });
});

module.exports = router;
