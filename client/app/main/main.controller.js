'use strict';

angular.module('transmedApp')

.controller('MainCtrl', function ($scope, $log, ngDialog, $rootScope, CodeBird) {

  $scope.videos = [
    {'title' : 'video 1', 'question' : 'question 1', 'hashtag' : '#pfouahQ1'},
    {'title' : 'video 2', 'question' : 'question 2', 'hashtag' : '#pfouahQ2'}
  ];

  // initial action button, open the first modal
  $scope.openDefault = function (dataVideo) {

    ngDialog.open({
      // url from index.html at the root
      template: 'app/main/modal/modalvideo.html',
      plain: false,
      controller: 'VideoModalCtrl',
      className: 'ngdialog-theme-default',
      data: dataVideo,
      closeByEscape: false,
      closeByDocument: false,
      showClose: false,
      cache: false
    });

  };

    // Initialisation Codebird
    $log.debug($rootScope);
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

});