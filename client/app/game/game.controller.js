'use strict';

angular.module('transmedApp')

.controller('GameCtrl', function ($scope, $log) {
	$scope.games = [
	{'title' : 'Wash', 'description' : '« Même les particules les plus minuscules nous intéressent. »', 'logo' : 'wash2.png', 'partner' : 'Oceaneye', 'url' : 'http://www.oceaneye.eu/'},
	{'title' : 'Trash', 'description' : '« Ceci qui commence à la caisse, se termine souvent au milieu de l’ocean. »', 'logo' : 'trash2.png', 'partner' : 'Race for Water', 'url' : 'http://www.raceforwater.com/'},
	{'title' : 'Flash', 'description' : '« Une meilleure connaissance permet de mieux comprendre. »', 'logo' : 'flash2.png', 'partner' : 'Association Développement 21', 'url' : 'http://www.eau21.ch'}
	];
1});