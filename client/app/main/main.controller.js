'use strict';

angular.module('transmedApp')
  .controller('MainCtrl', function ($scope, $http, socket, $log, ApiService) {

  // --- Code exemple 
    $scope.awesomeThings = [];

    /*$http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });*/

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
   /* $scope.getStats = function(){
      getScores().then(getUsers).then(getGames).then(function (data){
        // use scores length
        // gameId + userId -> gameName + userName
        // send everything in $score.stats
      });
    }

    getScores = function(){
      return 
        $http.get('/api/scores').success(function(scores){
        $scope.scores = scores;
        socket.syncUpdates('scores', $scope.scores);
      }).error(function(errorCallback){
          $scope.message = 'Une erreur s\' produite : ' + errorCallback;
      });
    }

    getUsers = function(){
      $http.get('api/users').success(function(users){
        $scope.users = users;
        socket.syncUpdates('users', $scope.scores);
      }).error(function(errorCallback){
        $scope.message = 'Une erreur s\' produite : ' + errorCallback;
      })
    }

    getGames = function(){
      $http.get('api/games').success(function(games){
        $scope.games = games;
        socket.syncUpdates('games', $scope.games);
      }).error(function(errorCallback){
        $scope.message = 'Une erreur s\' produite : ' + errorCallback;
      })
    }*/





    ApiService.getThings(
      function(data){
        $scope.awesomeThings = data;
        socket.syncUpdates('thing', $scope.awesomeThings);
      }, 
      function(error){
        $scope.message = error;
      }
    );

  })

.factory('ApiService', function($http){
    return{
      getScores : function(callback, errorCallback){
        $http({
          method: 'GET',
          url : 'api/scores'
        }).success(function(data, status, headers, config){
          callback(data);
        }).error(function(data, status, headers, config){
          errorCallback(data);
        });
      },

      getUsers : function(callback, errorCallback){
        $http({
          method: 'GET',
          url : 'api/users'
        }).success(function(data, status, headers, config){
          callback(data);
        }).error(function(data, status, headers, config){
          errorCallback(data);
        })
      },

      getThings : function(callback, errorCallback){
        $http({
          method: 'GET',
          url : 'api/things'
        }).success(function(data, status, headers, config){
          callback(data);
        }).error(function(data, status, headers, config){
          errorCallback(data);
        })
      }
    }
});
