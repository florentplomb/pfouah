'use strict';

angular.module('transmedApp')
	.factory('DataService', function($http){
		var videos = [
		    {'title' : 'Je suis en manque', 'question' : 'Et toi, c’est quoi ta dope?', 'hashtag' : '#pfouahQ1'},
		    {'title' : 'Le rencard immaculé', 'question' : 'Deux jours sans douche, ça te ferait quoi?', 'hashtag' : '#pfouahQ2'}
		 ];

		return{
			getVideos: function(){
				return videos;
			}
		};
	});