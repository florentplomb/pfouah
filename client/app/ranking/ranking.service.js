'use strict';

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
	});