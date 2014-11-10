/**
 * Created by igor on 04.11.2014.
 */

'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth) {

    if (Auth.signedIn()) {
        $location.path('/');
    }

    $scope.login = function () {
        Auth.login($scope.user).then(function () {
            $location.path('/');
        },function (error){
            $scope.error=error.toString();
        });
    };

    $scope.register = function () {
        Auth.register($scope.user).then(function(user) {
                return Auth.login($scope.user).then(function() {
                    user.username = $scope.user.username;
                    return Auth.createProfile(user);
                }).then(function(){
                    $location.path('/');
                });

        }, function(error){
            $scope.error=error.toString();
        });
    };
});