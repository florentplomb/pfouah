'use strict';

angular.module('transmedApp')
	.factory('TweetService', function($http, TwitterUrl){
		return{
			getTweet : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: TwitterUrl + 'statuses/user_timeline.json?screen_name=eve_status&count=15'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			}
		}
	});