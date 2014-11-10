/**
 * Created by igor on 06.11.2014.
 */
'use strict';

app.factory('Tracks', function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var refs=[];
    var polylines=[];
    var polyline={id: 1,
                   path:[],
                   visible: true,
                   stroke: {
                   color: '#6060FB',
                   weight: 3
                   }
                 };
    var track={
        all: polylines,
        initialize: function(uidArray){
            uidArray.forEach(function(uid) {
                refs[uid]=$firebase(ref.child('tracks').child(uid).child('path')).$asArray();
                polyline.id=1;
                polyline.path=[];
                polylines.push(polyline);
                refs[uid].$watch(function(event){
                    if (event.event==='child_added'){
                        var data=refs[this][event.key];
                        //console.log(event);
                       // console.log(event.key);
                        polylines[0].path.push(data);

                        }
                    },uid);
               });
            }
        };
    return track;
 });
