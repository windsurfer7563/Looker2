/**
 * Created by igor on 30.10.2014.
 */
'use strict';

app.controller('DashboardCtrl',['$scope', '$location','Auth','Following', 'GoogleMapApi'.ns(), 'Tracks','COLORS', function ($scope,$location,Auth,Following,GoogleMapApi,Tracks,COLORS) {
    var uidArray=[];
     $scope.followings=[];
     $scope.signedIn = Auth.signedIn;
     $scope.user=Auth.user;
     $scope.path_visible = true;



    $scope.markers=Tracks.markers;

    Auth.resolveUser().then(function (usr) {
                 if (usr!=null){
                 $scope.followings = Following.get(usr.uid);
                 $scope.followings.$loaded().then(function () {
                    //console.log(Auth.user.profile.username);
                     //додаємо самого себе до списку слідуваних
                     $scope.followings.push({$id:$scope.user.profile.$id,enabled:true,name:"my device"});
                 //    console.log($scope.followings);
                     AssignColors();
                     Tracks.initialize(followIds()).then(function (data) {
                         $scope.map.polylines = data;
                         $scope.map.bounds = Tracks.markers;
                         //   $scope.markers=Tracks.markers;
                     });

                 });
             }
        }
    );

    $scope.changeEnabled = function(enabled){
    //   console.log('enabled: ',enabled);

        if (enabled.enabled===false){
            Tracks.destroy(enabled.$id);
        }
        else
        {
           uidArray[0]={id: enabled.$id,color: enabled.color};
            Tracks.initialize(uidArray).then(function(data) {
            $scope.map.polylines = data;
            });

        }

    };

    function AssignColors(){
        var c=0;
        $scope.followings.forEach(function (fl){
            fl.color=COLORS[c];c++;
            });
    }

    function followIds(){
         var data = [];
         $scope.followings.forEach(function (fl) {
              //  console.log(fl);
                 if (fl.enabled === true) {
                     data.push({id:fl.$id, color:fl.color});
                 }
            });
      //  console.log(data);
        return data;
     }

    GoogleMapApi.then(function() {

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
            polylines: [],
            events: {
                tilesloaded: function (map) {
               // console.log('this is the map instance', map);
                }}
            };

        $scope.map.marker={options:{
                 dragable:false,
                 //animation:google.maps.Animation.BOUNCE
                }
        };



    });

/*
    $scope.followings.$on('change', function() {
        console.log('followings changed');
    });
*/

}]);






