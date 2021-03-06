/**
 * Created by igor on 04.11.2014.
 */
'use strict';

app.factory('Auth', function ($firebaseSimpleLogin,$firebase, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
        register: function (user) {
            return auth.$createUser(user.email, user.password);
        },
        createProfile: function (user) {
            var profile = {
                username: user.username,
                md5_hash: user.md5_hash
            };
        //    console.log(user);
            var profileRef = $firebase(ref.child('profile'));
            return profileRef.$set(user.id, profile);
        },
        login: function (user) {
            return auth.$login('password', user);
        },
        logout: function () {
            auth.$logout();
        },
        resolveUser: function() {
            return auth.$getCurrentUser();
        },
        signedIn: function() {
            return !!Auth.user.provider;
        },
        followRegister: function (user,follow) {
            var profileRef = $firebase(ref.child('profile').child(user.uid).child('following'));
            var follow_profile = {
                name: follow.name,
                enabled: true
                    };
            return profileRef.$set(follow.id,follow_profile);
        },

        user: {}
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        console.log('logged in');
        angular.copy(user, Auth.user);
        Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.id)).$asObject();
        });
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
        console.log('logged out');
        if(Auth.user && Auth.user.profile) {
            Auth.user.profile.$destroy();

        }
        angular.copy({}, Auth.user);
    });

    return Auth;
});
