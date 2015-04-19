'use strict';

angular.module('transmedApp')
	.controller('RankingCtrl', function ($scope, $http, socket, $log, StaticService){

		StaticService.getUsers(
			function(data){
				$scope.datas = data;
			},
			function(error){
				$scope.error = error;
			}
		);

		$scope.tabs = [
			{'title' : 'Totaux', 'id': '1'},
			{'title' : 'Cummulés', 'id': '2'},
			{'title' : 'Wash', 'id': '3'},
			{'title' : 'Trash', 'id': '4'},
			{'title' : 'Flash', 'id': '5'}
		];

		$scope.activeTab = $scope.tabs[0].id;
		$scope.predicate = '';

		$scope.showTab = function (currentTab){
			$scope.activeTab = currentTab;
			//$log.debug(currentTab);
		};
		
	});