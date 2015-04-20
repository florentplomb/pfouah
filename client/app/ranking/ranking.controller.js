'use strict';

angular.module('transmedApp')
	.controller('RankingCtrl', function ($scope, $http, socket, $log, StaticService){

		StaticService.getScores (
			function(data){
				$scope.datas = data;

				// TODO trier et assigner valeur à position

				// Default sort options
				$scope.predicate = $scope.tabs[0].predicate;
				$scope.reverse = $scope.tabs[0].reverse;
			},
			function(error){
				$scope.error = error;
			}
		);

		$scope.tabs = [
			{'title' : 'Totaux', 'id': '1', 'predicate' : 'scores.scoreTot', 'reverse' : '-reverse'},
			{'title' : 'Cummulés', 'id': '2', 'predicate' : 'scores.totalHs', 'reverse' : '-reverse'},
			{'title' : 'Wash', 'id': '3', 'predicate' : 'scores.hsWash', 'reverse' : '-reverse'},
			{'title' : 'Trash', 'id': '4', 'predicate' : 'scores.hsTrash', 'reverse' : '-reverse'},
			{'title' : 'Flash', 'id': '5', 'predicate' : 'scores.hsFlash', 'reverse' : '-reverse'}
		];

		$scope.activeTab = $scope.tabs[0].id;

		$scope.showTab = function (idTab){
			$scope.activeTab = idTab;

			// Sort the datas when changing active tab
			var i = idTab - 1 ;
			$scope.predicate = $scope.tabs[i].predicate;
			$scope.reverse = $scope.tabs[i].reverse;
		};
		
	});