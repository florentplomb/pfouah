'use strict';
// https://zkillboard.com/api/kills/characterID/91706280/
// http://pfouah2015.herokuapp.com/api/users

angular.module('transmedApp')
	.factory('ApiService', function($http, ApiUrl){
		return{
			getScores : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: ApiUrl + 'api/users/scores'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			},

			test : function(callback, errorCallback){
				$http({
					method : 'GET',
					url: 'ba-simple-proxy.php?url=http://pfouah2015.herokuapp.com/api/users/scores'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			}
		}
	})

	.factory('StaticService', function($http){
		return{
			getScores : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: 'assets/json/users.scores.json'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			},
			getUsers : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: 'assets/json/users.json'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});				
			}
		}
	});