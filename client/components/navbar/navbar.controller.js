'use strict';

angular.module('transmedApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Classements',
      'link': '/ranking'
    }, {
      'title': 'Mur de selfies',
      'link': '/photowall'
    },{
      'title': 'Feeds',
      'link': '/feed'
    },{
      'title': 'Partenaires',
      'link': '/partner'
    },{
      'title': 'Jeux',
      'link': '/game'
    }];

    $scope.isCollapsed = true;
    //$scope.isLoggedIn = Auth.isLoggedIn;
    //$scope.isAdmin = Auth.isAdmin;
    //$scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      // Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });