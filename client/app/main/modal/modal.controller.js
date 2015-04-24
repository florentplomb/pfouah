'use strict';

angular.module('transmedApp')

// First modal configs & actions
.controller('FirstPopupCtrl', function ($scope, $log, ngDialog) {
  	
  	$scope.openSecond = function (dataVideo) {
    	ngDialog.close();

	   	ngDialog.open({
		    // url from index.html at the root
		    template: 'app/main/modal/modal2.html',
		    plain: false,
		    controller: 'SecondPopupCtrl',
		    className: 'ngdialog-theme-default',
		    data: dataVideo,
		    closeByEscape: false,
		    closeByDocument: false,
		    showClose: false,
		    cache: false
		});

  	};

})

// Second modal configs & actions
 .controller('SecondPopupCtrl', function ($scope, $log, ngDialog, $rootScope) {

 	$scope.feedback = '';
  var cb = $rootScope.cb;
  $log.debug(cb);

  	$scope.closeSecond = function () {
    	ngDialog.close();
  	};

  	$scope.submitForm = function (answer, video){

  		if (answer.length < 1 || answer.length >= 120) {
  			answer = undefined;
  			$scope.feedback = 'Il n\'y a rien à envoyer.';
  		}else{
        // Answer in params
        var params = {
          status: video.hashtag + ' ' + answer
        };

        $log.debug(params);
        
        // Tweet the answer
        cb.__call(
            "statuses_update",
            params,
            function (reply) {
                // ...
            }
        );
      }

  		ngDialog.close();
  	};

});