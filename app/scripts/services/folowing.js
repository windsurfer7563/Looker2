/**
 * Created by igor on 31.10.2014.
 */
'use strict';

app.factory('Following', function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);

    var following={
        get: function(uid){
          return $firebase(ref.child('profile').child(uid).child('following')).$asArray();

          /*
            var defer=$q.defer();

            $firebase(ref.child('profile').child(uid).child('following'))
                .$asArray()
                .$loaded()
                .then(function(data){
                    var folowings={};
                    for (var i=0;i<data.length;i++){
                        var folowingId=data.$keyAt(i);
                        folowings[folowingId]=User.get(folowingId); //тут можемо додати перевірку чи активний користувач зараз.
                      }
                   defer.resolve(folowings);
                });

            return defer.promise;
        */

        }
    };
    return following;
});