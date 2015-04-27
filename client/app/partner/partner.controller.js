 'use strict';

 angular.module('transmedApp')
 	.controller('PartnerCtrl', function ($scope, $log){
 		$scope.partners = [
 			{"name" : "Race For Water", "twitter" : "https://twitter.com/RaceForWater", "facebook" : "https://www.facebook.com/raceforwaterfoundation", "site" : "http://www.raceforwater.com/", "sentence" : ""},
 			{"name" : "TrinkWasser", "twitter" : "", "facebook" : "https://de-de.facebook.com/SVGWSSIGE", "site" : "http://trinkwasser.svgw.ch/", "sentence" : ""},
 			{"name" : "ASL", "twitter" : "", "facebook" : "https://www.facebook.com/asl.leman.1", "site" : "http://asleman.org/fr/", "sentence" : ""}
 		];

 		$log.debug($scope.partners);
 	});