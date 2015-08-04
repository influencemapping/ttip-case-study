'use strict';

angular.module('ttip',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource',
  'ui.router', 'ui.bootstrap',
  'ttip.graph', 'ttip.services'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
