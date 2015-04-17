'use strict';

angular.module('transmedApp')

.controller('MainCtrl', function ($scope, ngDialog) {

  // initial action button, open the first modal
  $scope.openDefault = function () {
    ngDialog.open({
      // url from index.html at the root
      template: 'app/main/modal/modal1.html',
      plain: false,
      controller: 'FirstPopupCtrl',
      className: 'ngdialog-theme-default',
      closeByEscape: false,
      closeByDocument: false,
      showClose: false,
      cache: false
    });
  };
});