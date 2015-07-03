'use strict';

angular.module('inscripcionesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('email', {
      	url: '/customemail',
      	templateUrl: 'app/customemail/email.html'
      });
  });