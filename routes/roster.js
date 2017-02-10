var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://madsquabbles-ceb0a.firebaseio.com"
});


/* GET roster listing. */
router.get('/', function(req, res, next) {
  var db = admin.database();
  var ref = db.ref("/roster");

  ref.once("value", function(snapshot) {
    var data = snapshot.val();
    console.log(data);
    res.render('roster', { 'title': 'Mad Squabbles - Roster', 'pageTitle': 'Roster---', 'roster': data});
  });
});

module.exports = router;
