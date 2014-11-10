/**
 * Created by igor on 04.11.2014.
 */
'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth) {
         $scope.signedIn = Auth.signedIn;
         $scope.logout = Auth.logout;
         $scope.user=Auth.user;

        });



