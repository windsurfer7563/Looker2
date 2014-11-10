/**
 * Created by igor on 30.10.2014.
 */
'use strict';

app.controller('DashboardCtrl',['$scope', '$location','User','Auth','Following', 'GoogleMapApi'.ns(), 'Tracks', function ($scope,$location,User,Auth,Following,GoogleMapApi,Tracks) {
     $scope.signedIn = Auth.signedIn;
     $scope.user=Auth.user;


     Auth.resolveUser().then(function(usr){
         $scope.followings=Following.get(usr.uid);
     });








    GoogleMapApi.then(function() {
       // $scope.polylines=[]
      //  $scope.polylines.push(Tracks.get('simplelogin:6'));
        Tracks.initialize(['simplelogin:6']);

        $scope.map = {
            control: {},
            options: {
                streetViewControl: false,
                panControl: false,
                maxZoom: 20,
                minZoom: 3
            },
            center: {
                latitude: 40.1451,
                longitude: -99.66
            },
            zoom: 4,
            polylines: Tracks.all,
            events: {
                tilesloaded: function (map) {
                        console.log('this is the map instance', map);
                        $scope.$apply();
                    },
                zoom_changed: function (map) {
                    console.log('this is the zoom', map);
                   }
                }
            };

        $scope.map.polylines.push(
            {
                id: 3,
                path: [{latitude:40,longitude:-74},{latitude:30,longitude:-89},{latitude:31,longitude:-122}],
                stroke: {
                    color: '#FB6060',
                    weight: 3
                },

            });

         //console.log($scope.map);
        //$scope.$apply();
    });

    $scope.$watch('polylines', function(){
        console.log('polylines changed');

    });
    $scope.$watch('followings', function(){
        console.log('folowings changed');

    });




}]);






