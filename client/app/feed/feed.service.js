'use strict';

angular.module('transmedApp')
	.factory('FeedService', function($http){
		return{
			getTweet : function(callback, errorCallback){
				$http({
					method: '',
					url: ''
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			}
		}
	});