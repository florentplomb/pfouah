'use strict';

angular.module('transmedApp')
	.controller('FeedCtrl', function ($scope, $http, $log, TweetService){

		TweetService.getTweets(
			function(data){
				$scope.datas = data;
			},
			function(error){
				$scope.error = error;
			}
		);

	});