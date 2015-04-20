'use strict';

angular.module('transmedApp')
	.controller('WallCtrl', function ($scope, $http, socket, $log, StaticService){

		StaticService.getUsers(
			function(data){
				$scope.datas = data;

				for (var i = $scope.datas.length - 1; i >= 0; i--) {
					$scope.datas[i].imgUrl = 'http://pfouah2015.herokuapp.com/' + data[i].imgUrl;
					$log.debug($scope.datas[i].imgUrl);
				};
			},
			function(error){
				$scope.error = error;
			}
		);


		$scope.likePlayer = function(photo){
			photo.like ++;
			//$log.debug(photo); 
		}

		$scope.dislikePlayer = function(photo){
			photo.like--;
			if(photo.like <= 0){
				photo.like = 0;
			}
		}
	});