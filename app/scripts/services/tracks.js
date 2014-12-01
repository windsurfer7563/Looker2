/**
 * Created by igor on 06.11.2014.
 */
'use strict';

app.factory('Tracks', function ($firebase, FIREBASE_URL, $rootScope,COLORS, $q) {
    var ref = new Firebase(FIREBASE_URL);
    var refs=[];
    var markers=[];
    var polylines=[];
    function Polyline(id, path){
                   this.id=id,
                   this.path=path,
                   this.visible= true,
                   this.stroke={
                   color: '#6060FB',
                   weight: 2
                   };
                 }
    function Marker(id,coords,color){
                  this.id=id,
                  this.coords=coords,
                  this.icon={
                      path: google.maps.SymbolPath.CIRCLE,
                      strokeColor:color,
                      fillColor:'#FFFFFF',
                      fillOpacity:1,
                      scale: 5,
                      strokeWeight:2
                  };
    }
    var track={
        initialize: function(uidArray){
           var defer=$q.defer();

           uidArray.forEach(function(uid) {
                refs[uid.id]=$firebase(ref.child('tracks').child(uid.id).child('path')).$asArray();
                refs[uid.id].$loaded().then(function(data){
                    var  p =  new Polyline(uid.id,data);
                    p.stroke.color=uid.color;
                   // console.log('polylines ',polylines)
                    polylines.push(p);
                    markers.push(new Marker(uid.id,data[data.length-1],uid.color));
                  //  markers.push({id:uid.id,coords: $firebase(ref.child('tracks').child(uid.id).child('path')).$asObject})

                    Setwatch(refs[uid.id],uid.id);
                    defer.resolve(polylines);
                    //console.log(polylines);
                });

               });

            return defer.promise;

        },
        destroy: function(id){
           var ind=0;
         //  console.log('destroy begin, polylines:', polylines);
           refs[id].$destroy();

           polylines.forEach(function(p,k){
               if (p.id===id){ind=k;}
           })
           // polylines[ind].$destroy;
            polylines.splice(ind,1);
            markers.length=0;
            polylines.forEach(function(p){
                markers.push(new Marker(p.id,p.path[p.path.length-1], p.stroke.color));
            });

           // console.log('polylines result after destroy: ', polylines);


           },
        markers: markers

        };

    function Setwatch(r,id){
           r.$watch(function(event) {
               console.log('markers before:',markers);
           if (event.event==='child_added') {
               markers.length=0;
               polylines.forEach(function(p){
                    markers.push({id:p.id,coords: p.path[p.path.length-1]})
               });
            //   console.log('markers updated:', markers);

           }

        },id)
    };


    return track;
 });
