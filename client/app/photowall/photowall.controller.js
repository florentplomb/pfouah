'use strict';

angular.module('transmedApp')
	.controller('WallCtrl', function ($scope, $http, $log, StaticService, ApiService, localStorageService){
		$scope.error = '';
		$scope.res = '';

		// Local storage functions
	  	function addItem(key, val) {
	   		return localStorageService.set(key, val);
	  	}

	   	function getItem(key) {
	   		return localStorageService.get(key);
	  	}

	  	$scope.getItem = function(key) {
	  		return localStorageService.get(key);
	  	}

	  	function removeItem(key) {
   			return localStorageService.remove(key);
  		}

	  	// Page loading
		ApiService.getUsers(
			function(data){
				$scope.datas = data;

				for (var i = $scope.datas.length - 1; i >= 0; i--) {
					$scope.datas[i].imgUrl = 'http://pfouah2015.herokuapp.com/api/images/' + data[i].imgId;
					$log.debug($scope.datas[i].imgUrl);
				};

				console.log($scope.datas);
			},
			function(error){
				$scope.error = error;
			}
		);

		$scope.likePlayer = function(photo){
			$scope.res = getItem(photo._id);

			if($scope.res == null){
				addItem(photo._id, photo._id);
				photo.like ++;
				$scope.error = 'vote comptabilisé !!!';
				// Update DB
			}else{
				$scope.error = 'Vous avez déjà voté pour cette image auparavant!';
			}
		}

		$scope.dislikePlayer = function(photo){
			$scope.res = getItem(photo._id);

			if($scope.res == null){
				addItem(photo._id, photo._id);
				//photo.like--;
				
				ApiService.likeImage(photo._id, 'p',
					function(data){
						$scope.datas.like = data.like;
						$scope.error = 'Vote comptabilisé.';
					},
					function(error){
						$scope.error = 'Une erreur s\'est produite.';
					}
				);
			}else{
				$scope.error = 'Vous avez déjà voté pour cette image auparavant!';
			}
		}
	});