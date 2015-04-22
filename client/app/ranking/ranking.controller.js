'use strict';

angular.module('transmedApp')
	.controller('RankingCtrl', function ($scope, $http, $log, StaticService){

		StaticService.getScores (
			function(data){

				var positions = [];
				for (var i = data.length; i >= 0; i--) {
					positions.push(i);
				};

				// Tri par scores totaux
				data.sort(function(a, b){
					return a.scores.scoreTot-b.scores.scoreTot;
				});
				for (var i = data.length - 1; i >= 0; i--) {
					data[i].posTot = positions[i];
				};	

				// Tri par scores cumulés
				data.sort(function(a, b){
					return a.scores.totalHs-b.scores.totalHs;
				});
				for (var i = data.length - 1; i >= 0; i--) {
					data[i].posCumul = positions[i];
				};	

				// Tri par scores wash
				data.sort(function(a, b){
					return a.scores.hsWash-b.scores.hsWash;
				});
				for (var i = data.length - 1; i >= 0; i--) {
					data[i].posWash = positions[i];
				};

				// Tri par scores wash
				data.sort(function(a, b){
					return a.scores.hsFlash-b.scores.hsFlash;
				});
				for (var i = data.length - 1; i >= 0; i--) {
					data[i].posFlash = positions[i];
				};	

				// Tri par scores trash
				data.sort(function(a, b){
					return a.scores.hsTrash-b.scores.hsTrash;
				});
				for (var i = data.length - 1; i >= 0; i--) {
					data[i].posTrash = positions[i];
				};

				$scope.datas = data;
				//$log.debug($scope.datas);

				// Default sort options
				$scope.predicate = 'posTot';
				$scope.reverse = '';
			},
			function(error){
				$scope.error = error;
			}
		);

		$scope.tabs = [
			{'title' : 'Totaux', 'id': '1', 'predicate' : 'posTot', 'reverse' : ''},
			{'title' : 'Cummulés', 'id': '2', 'predicate' : 'posCumul', 'reverse' : ''},
			{'title' : 'Wash', 'id': '3', 'predicate' : 'posWash', 'reverse' : ''},
			{'title' : 'Trash', 'id': '4', 'predicate' : 'posTrash', 'reverse' : ''},
			{'title' : 'Flash', 'id': '5', 'predicate' : 'posFlash', 'reverse' : ''}
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