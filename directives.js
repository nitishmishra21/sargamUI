/**
 *  Module
 *
 * Description
 */
angular.module('starter.directives', []).directive('songTile', function() {
	return {
		restrict: 'E',
		 
		templateUrl: 'templates/songTile.html',
		scope: {
			song: '=',
			checkout:'=',
			favClick:'&onFavClick',
			deleteFavClick:'&onDeleteFavClick',
			mySwipe:'&onSwipe',
			buyClick:'&onBuyClick'
		}
	}
})