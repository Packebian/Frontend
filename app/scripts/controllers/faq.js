/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:FaqCtrl
 * @description
 * # FaqCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('FaqCtrl', function ($scope) {
		$scope.displayTutos();
		$scope.displayFaq();
	});