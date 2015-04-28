 'use strict';

 angular.module('transmedApp')
 	.controller('PartnerCtrl', function ($scope, $log){
 		$scope.partners = [
 			{"name" : "Race For Water", "twitter" : "https://twitter.com/RaceForWater", "facebook" : "https://www.facebook.com/raceforwaterfoundation", "site" : "http://www.raceforwater.com/", "logo" : "raceforwater_logo.png"},
 			{"name" : "TrinkWasser", "twitter" : "", "facebook" : "https://de-de.facebook.com/SVGWSSIGE", "site" : "http://trinkwasser.svgw.ch/", "logo" : "Logo_Trinkwasser_cmyk.png"},
 			{"name" : "ASL", "twitter" : "", "facebook" : "https://www.facebook.com/asl.leman.1", "site" : "http://asleman.org/fr/", "logo" : "asl_logo.png", "style" : "asl"}
 		];

 		$log.debug($scope.partners);
 	});