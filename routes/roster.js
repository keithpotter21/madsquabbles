var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

/* GET roster listing. */
router.get('/', function(req, res, next) {
    var db = firebase.database();
    var ref = db.ref("/roster/players");

    ref.orderByChild("active")
        .equalTo(1)
        .once("value")
        .then(function(snapshot) {
            var data = snapshot.val();
            if(data) {
                console.log(data);
                res.render('roster', {title: 'Mad Squabbles - Roster', pageTitle: 'Roster', roster: data});
            } else {
                res.status(401).json({error: 'No players found'});
            }
        });
});

module.exports = router;
