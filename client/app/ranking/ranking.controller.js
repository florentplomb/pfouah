'use strict';

angular.module('transmedApp')
	.controller('RankingCtrl', function ($scope, $http, socket, $log, RankingService){
		$scope.fetch = function(){
			RankingService.getUsers(
				function(data){
					$scope.res = data;
				},
				function(error){
					$scope.error = error;
				}
			);
		}
	});