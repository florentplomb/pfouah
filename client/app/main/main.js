'use strict';

angular.module('transmedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('stats', {
      	url: '/stats',
      	templateUrl: 'app/stats/stats.html',
      	controller: 'StatsCtrl'
      })
      .state('photowall',{
        url: '/photowall',
        templateUrl: 'app/photowall/photowall.html',
        controller: 'WallCtrl'
      });
  });