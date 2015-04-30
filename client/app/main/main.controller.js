'use strict';

angular.module('transmedApp')


.controller('MainCtrl', function ($scope, $window, $interval, $log, ngDialog, $http, $rootScope, CodeBird, DataService) {

  $scope.videos = DataService.getVideos();
  $scope.Math = window.Math;


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

  $interval($scope.callAtTimeout, 2000);

  $scope.callAtTimeout = function(){
    console.log('time');
    $http({
    method: 'GET',
    url: 'http://localhost:9000/api/scores'
   
    // url: 'http://pfouah.comem.ch/api/images/'
  }).success(function (data){
    $scope.totalTrash = 0;
    $scope.totalFlash = 0;
    $scope.totalWash = 0;
    console.log(data);
    angular.forEach(data, function(score, key){
      if(score.gameName === "trash"){
        $scope.totalTrash = $scope.totalTrash + score.pts;
      }else if(score.gameName === "flash"){
        $scope.totalFlash = $scope.totalFlash + score.pts;

      }else{
        $scope.totalWash = $scope.totalWash + score.pts;
        
      };
    })

    
    
  }).error(function (data){
    
  });
  }
  $http({
    method: 'GET',
    url: 'http://localhost:9000/api/scores'
   
    // url: 'http://pfouah.comem.ch/api/images/'
  }).success(function (data){
    $scope.totalTrash = 0;
    $scope.totalFlash = 0;
    $scope.totalWash = 0;
    console.log(data);
    angular.forEach(data, function(score, key){
      if(score.gameName === "trash"){
        $scope.totalTrash = $scope.totalTrash + (score.pts * 1.4);
      }else if(score.gameName === "flash"){
        $scope.totalFlash = $scope.totalFlash + score.pts;

      }else{
        $scope.totalWash = $scope.totalWash + (score.pts * 3.75);
        
      };
    })

    
    
  }).error(function (data){
    
  }); 
  

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

function callAtTimeout(){


}