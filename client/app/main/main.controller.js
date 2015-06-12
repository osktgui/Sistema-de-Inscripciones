'use strict';

angular.module('inscripcionesApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.person = {};

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };


    $scope.profiles = [
      {name: 'Negocios'},
      {name: 'Desarrollador'},
      {name: 'Dsiseñador'}
    ];

    $scope.pofs = [
      {name: 'Boleta de venta'},
      {name: 'Factura'}
    ];


    $scope.submit = function(form){
      if(form.$valid){
        $http.post('/api/People', $scope.person).success(function(response) {
          $scope.person = {};
        });
      }
    };
  });
