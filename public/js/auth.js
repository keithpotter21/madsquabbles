/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
        window.location = "/";
    } else {
        window.location = "/users/login";
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}


initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in as ' + user.displayName;
                document.getElementById('sign-in').textContent = 'Sign out';
            });
        } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = '';
            document.getElementById('sign-in').textContent = 'Sign in';
        }

        // [START_EXCLUDE silent]
        document.getElementById('sign-in').disabled = false;
        // [END_EXCLUDE]
    }, function(error) {
        console.log(error);
    });


    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
};

window.addEventListener('load', function() {
    initApp()
});