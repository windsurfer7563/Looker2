
'use strict';

/**
 * @ngdoc overview
 * @name looker2App
 * @description
 * # looker2App
 *
 * Main module of the application.
 */
var app = angular
  .module('looker2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'google-maps'.ns()
  ])
  .constant('FIREBASE_URL','https://torid-heat-157.firebaseio.com/')
  .config(['$routeProvider', 'GoogleMapApiProvider'.ns(), function ($routeProvider,GoogleMapApi) {
   GoogleMapApi.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
   $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl',
            resolve:{
                user: function(Auth){
                    return Auth.resolveUser();
                }
            }
        })
       .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl',
            resolve: {
                user: function(Auth) {
                    return Auth.resolveUser();
                }
            }
        })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      }]
    );

