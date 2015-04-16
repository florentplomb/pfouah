'use strict';

angular.module('transmedApp')

.controller('MainCtrl', function ($scope, $modal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})











.controller('MainCtrl', function ($scope, $http, socket, $log) {

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
