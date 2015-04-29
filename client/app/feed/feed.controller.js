'use strict';

angular.module('transmedApp')
	.controller('FeedCtrl', function ($scope, $rootScope, $http, $log, localStorageService, TwitterUsername, CodeBird, DataService){
		$scope.error = '';
		//$scope.datas = [];
		$scope.videos = DataService.getVideos();
		//$log.debug($scope.videos);

		// Local storage : add an item
	  	function addItem(key, val) {
	   		return localStorageService.set(key, val);
	  	};

	  	// Local storage : get an item
	   	function getItem(key) {
	   		return localStorageService.get(key);
	  	};

	  	// Convert date to "xxx ago" format
	  	function convertDate(date){
	  		 moment().locale('fr');
			 var now = new Date();
			 var nowWrapper = moment(now);                  
			 var pastDateWrapper = moment(new Date(date));
			 var displayDate = pastDateWrapper.from(nowWrapper);
			 return displayDate; 		
	  	};

	  	// Convert text : get rid of wrong format
	  	function convertText(text){
	  		var a = text;
			//$log.debug(a);

			var div = document.createElement('div');
			div.innerHTML = a;
			var decoded = div.firstChild.nodeValue;
			//$log.debug(decoded);
			return decoded;
	  	};

		// Initialisation Codebird
	  	if ($rootScope.cb === undefined) {
			var cb = new Codebird;
		    cb.setConsumerKey(CodeBird.key, CodeBird.keyS);
		    cb.setToken(CodeBird.tok, CodeBird.tokS);
			$rootScope.cb = cb;
	  		//$log.debug('from init');
	  	}else{
	  		var cb = $rootScope.cb;
	  		//$log.debug('from rootscope');
	  	}

		// Call for timeline - Notre projet
		/*cb.__call(
		    "statuses_userTimeline",
		    {
		    	"screen_name": TwitterUsername,
		    	"count": "10"
			},
		    function (reply) {
		    	// Add created_at_readable and convert text
		    	for (var i = reply.length - 1; i >= 0; i--) {
					reply[i].created_at_readable = convertDate(reply[i]);
					reply[i].text = convertText(reply[i].text);
		    	};
		    	//$log.debug(reply);
		    	$scope.tweetsProject = reply;
		    	$scope.$digest();
		    }
		);*/

		// Call for Q1
		cb.__call(
			"search_tweets",
			{
				"q": "#pfouahQ1 "+ TwitterUsername,
				"result_type" : "realtime",
				"count" : "5"
			},
			function (reply, rate_limit_status){
		    	// Add created_at_readable and convert text
		    	for (var i = reply.statuses.length - 1; i >= 0; i--) {
					reply.statuses[i].created_at_readable = convertDate(reply.statuses[i].created_at);
					reply.statuses[i].text = convertText(reply.statuses[i].text);
		    	};
		    	$log.debug(rate_limit_status);
		    	$scope.tweetsQ1 = reply.statuses;
		    	$scope.$digest();
			},
			true
		);

		// Call for Q2
		cb.__call(
			"search_tweets",
			{
				"q": "#pfouahQ2 "+ TwitterUsername,
				"result_type" : "realtime",
				"count" : "5"
			},
			function (reply, rate_limit_status){
		    	// Add created_at_readable and convert text
		    	for (var i = reply.statuses.length - 1; i >= 0; i--) {
					reply.statuses[i].created_at_readable = convertDate(reply.statuses[i].created_at);
					reply.statuses[i].text = convertText(reply.statuses[i].text);
		    	};
		    	$log.debug(rate_limit_status);
		    	$scope.tweetsQ2 = reply.statuses;
		    	$scope.$digest();
			},
			true
		);

		// Call for timeline - Race For Water
		cb.__call(
		    "statuses_userTimeline",
		    {
		    	"screen_name": "RaceForWater",
		    	"count": "9"
			},
		    function (reply, rate_limit_status) {
		    	// Add created_at_readable and convert text
		    	for (var i = reply.length - 1; i >= 0; i--) {
					reply[i].created_at_readable = convertDate(reply[i].created_at);
					reply[i].text = convertText(reply[i].text);
		    	};
		    	$log.debug(rate_limit_status);
		    	$scope.tweetsAssoc1 = reply;
		    	$scope.$digest();
		    },
		    true
		);
	});