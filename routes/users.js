var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

// Register
router.get('/register', function(req, res){
    res.render('register', {menu: 'register'});
});

// Login
router.get('/login', function(req, res){
    res.render('login', {menu: 'login', "success_message": req.flash("success_message")});
});

// Register User
router.post('/register', function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        console.log("Validation errors:", errors);
        res.render('register',{
            errors: errors,
            data: {"username": username, "email": email}
        });
    } else {
        firebase.auth().getUserByEmail(email)
            .then(function(userRecord) {
                console.log("Successfully fetched user data:", userRecord.toJSON());
            })
            .catch(function(error) {
                console.log("Attempting to create user:", error);
                firebase.auth().createUser({
                    email: email,
                    emailVerified: false,
                    password: password,
                    displayName: username,
                    disabled: false
                })
                    .then(function(userRecord) {
                        console.log("Successfully created new user:", userRecord.uid);
                        req.flash('success_message', 'You are registered. Please check your email to verify your email address.');
                        res.redirect('/users/login');
                    })
                    .catch(function(error) {
                        console.log("Error creating new user:", error);
                        res.render('register', {
                            firebase_errors: error
                        });
                    });
            });
    }
});

module.exports = router;

