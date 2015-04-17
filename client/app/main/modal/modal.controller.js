'use strict';

angular.module('transmedApp')

// First modal configs & actions
.controller('FirstPopupCtrl', function ($scope, $log, ngDialog) {
  	$scope.openSecond = function () {
    	ngDialog.close();
    	$log.debug('second modal');
	   		ngDialog.open({
		    // url from index.html at the root
		    template: 'app/main/modal/modal2.html',
		    plain: false,
		    controller: 'SecondPopupCtrl',
		    className: 'ngdialog-theme-default',
		    closeByEscape: false,
		    closeByDocument: false,
		    showClose: false,
		    cache: false
		});
  	};
})

// Second modal configs & actions
 .controller('SecondPopupCtrl', function ($scope, $log, ngDialog) {
  	$scope.closeSecond = function () {
    	ngDialog.close();
  	};

  	$scope.submitForm = function (answer){
  		$log.debug(answer);
  	}
});