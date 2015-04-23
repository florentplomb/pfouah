'use strict';

angular.module('transmedApp')
	.controller('FeedCtrl', function ($scope, $rootScope, $http, $log, localStorageService){
		$scope.error = '';
		$scope.datas = [];

		// Local storage functions
	  	function addItem(key, val) {
	   		return localStorageService.set(key, val);
	  	};

	   	function getItem(key) {
	   		return localStorageService.get(key);
	  	};

	  	function concertDate(tweet){
			 var now = new Date();
			 var nowWrapper = moment(now);                  
			 var pastDateWrapper = moment(new Date(tweet.created_at));
			 var displayDate = pastDateWrapper.from(nowWrapper);
			 return displayDate; 		
	  	};

	  	// Initialisation Codebird
		var cb = new Codebird;
		cb.setConsumerKey("dXQ5VccrbKbQVvFFuDR1igBxi", "oNcCuayrTLcx1cmn9F1OVmo19p3i0AIOtUFdYaloVhN79UZymj");
		cb.setToken("3186273089-QByeigjencHbE65KXryOfo2fENJDyKow4rIsfwn", "YgpIr5iktLOmaavwtQCK8oUZ0tbRnap6eDTZX192BQvtR");

		// Call for timeline - Notre projet
		cb.__call(
		    "statuses_userTimeline",
		    {},
		    function (reply) {

		    	// Add created_at différence from now timestamp
		    	for (var i = reply.length - 1; i >= 0; i--) {
	    			var displayDate = concertDate(reply[i]);
					reply[i].created_at_readable = displayDate;
		    	};

		    	//$log.debug(reply);
		    	$scope.tweetsProject = reply;
		    	$scope.$digest();
		    }
		);

		// Call for timeline - Race For Water
		cb.__call(
		    "statuses_userTimeline",
		    {
		    	"screen_name": "RaceForWater",
		    	"count": "3"
			},
		    function (reply) {

		    	// Add created_at différence from now timestamp
		    	for (var i = reply.length - 1; i >= 0; i--) {
	    			var displayDate = concertDate(reply[i]);
					reply[i].created_at_readable = displayDate;
		    	};
		    	
		    	$log.debug(reply);
		    	$scope.tweetsAssoc1 = reply;
		    	$scope.$digest();
		    }
		);

		// Call for Rate Limit Status
		cb.__call(
		    "application_rateLimitStatus",
		    {},
		    function (reply) {
		        $log.debug(reply);
		    }
		);
	});