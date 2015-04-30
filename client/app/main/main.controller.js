'use strict';

angular.module('transmedApp')


.controller('MainCtrl', function ($scope, $log, ngDialog, $rootScope, CodeBird, DataService) {

  $scope.videos = DataService.getVideos();


  // initial action button, open the video modal
  $scope.openVideoModal = function (dataVideo) {

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

  // $http({
  //   method: 'GET',
  //   // url: 'http://localhost:9000/api/images/' +photo.imgId._id + '/liked',
  //   url: 'http://pfouah.comem.ch/api/images/'
  // }).success(function (data){

    
    
  // }).error(function (data){
    
  // }); 

  $scope.totalFlash = 323;

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

});