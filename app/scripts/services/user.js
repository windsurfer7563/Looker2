/**
 * Created by igor on 31.10.2014.
 */
'use strict';

app.factory('User', function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    //var users = $firebase(ref.child('users')).$asArray();

    var User={
        get: function(userId){
            return $firebase(ref.child('profile').child(userId)).$asObject();
        }
    };
    return User;
});