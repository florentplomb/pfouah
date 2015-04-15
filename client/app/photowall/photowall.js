'use strict';

angular.module('transmedApp')
	.controller('WallCtrl', function ($scope, $http, socket, $log){
		$scope.photos = [
		    {'id': 'p1', 'title': 'A nice day!', 'src': "http://lorempixel.com/300/300/", 'cpt': '0'},
		    {'id': 'p2', 'title': 'Puh!', 'src': "http://lorempixel.com/300/300/sports", 'cpt': '10'},
		    {'id': 'p3', 'title': 'What a club!', 'src': "http://lorempixel.com/300/300/nightlife", 'cpt': '5'},
		    {'id': 'p1', 'title': 'A nice day!', 'src': "http://lorempixel.com/300/300/", 'cpt': '0'},
		    {'id': 'p2', 'title': 'Puh!', 'src': "http://lorempixel.com/300/300/sports", 'cpt': '10'},
		    {'id': 'p3', 'title': 'What a club!', 'src': "http://lorempixel.com/300/300/nightlife", 'cpt': '5'},
		    {'id': 'p1', 'title': 'A nice day!', 'src': "http://lorempixel.com/300/300/", 'cpt': '0'},
		    {'id': 'p2', 'title': 'Puh!', 'src': "http://lorempixel.com/300/300/sports", 'cpt': '10'},
		    {'id': 'p3', 'title': 'What a club!', 'src': "http://lorempixel.com/300/300/nightlife", 'cpt': '5'},
		    {'id': 'p1', 'title': 'A nice day!', 'src': "http://lorempixel.com/300/300/", 'cpt': '0'},
		    {'id': 'p2', 'title': 'Puh!', 'src': "http://lorempixel.com/300/300/sports", 'cpt': '10'},
		    {'id': 'p3', 'title': 'What a club!', 'src': "http://lorempixel.com/300/300/nightlife", 'cpt': '5'}
		];


		$scope.likePlayer = function(photo){
			photo.cpt ++;
			//$log.debug(photo); 
		}

		$scope.dislikePlayer = function(photo){
			photo.cpt--;
			if(photo.cpt <= 0){
				photo.cpt = 0;
			}
		}
	});