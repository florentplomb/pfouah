'use strict';

angular.module('transmedApp')
	.controller('RankingCtrl', function ($scope, $http, socket, $log, StaticService){

		var datas = [];

		StaticService.getUsers(
			function(data){
				$scope.datas = data;
				datas = data;
			},
			function(error){
				$scope.error = error;
			}
		);

		$scope.tabs = [
			{'title' : 'Scores totaux', 'id': '1'},
			{'title' : 'Best Scores : cummulés', 'id': '2'},
			{'title' : 'Best Scores : Wash', 'id': '3'},
			{'title' : 'Best Scores : trash', 'id': '4'},
			{'title' : 'Best Scores : flash', 'id': '5'}
		];

		$scope.content = [];

		$scope.activeTab = $scope.tabs[0].id;

		$scope.showTab = function (currentTab){
			$scope.activeTab = currentTab;
			//$log.debug(currentTab);
		};
		
	});