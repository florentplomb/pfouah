'use strict';

angular.module('transmedApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

  // --- Code exemple 
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
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

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

// --- Mon code
    $http.get('/api/scores').success(function(scores){
      $scope.scores = scores;
      socket.syncUpdates('score', $scope.scores);
    });
  });
