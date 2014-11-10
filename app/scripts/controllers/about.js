'use strict';

/**
 * @ngdoc function
 * @name looker2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the looker2App
 */
angular.module('looker2App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
