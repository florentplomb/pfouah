'use strict';
// https://zkillboard.com/api/kills/characterID/91706280/
// http://pfouah2015.herokuapp.com/api/users

angular.module('transmedApp')
	.factory('RankingService', function($http){
		return{
			getUsers : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: 'http://pfouah2015.herokuapp.com/api/users'
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