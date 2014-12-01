/**
 * Created by igor on 04.11.2014.
 */

'use strict';

app.controller('AddFollowCtrl', function ($scope, $location, Auth, User) {

    if (!Auth.signedIn()) {
        $location.path('/login');
    }


    $scope.addfollow = function () {
       User.get($scope.follow.id).$loaded().then(
          function(user) {
            if (user.pairingPass == $scope.follow.password) {
               $scope.follow.name=user.username;
               Auth.followRegister(Auth.user, $scope.follow).then(function () {
                   $location.path('/');
               }, function (error) {
                   $scope.error = error.toString();
               });
           } else {
               $scope.error = "Incorrect id or password";
           }
       },function (error){
           $scope.error = error.toString();
       });

    }

});