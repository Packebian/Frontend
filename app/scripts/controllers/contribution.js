/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ContributionCtrl
 * @argument $scope 
 * @description
 * # ContributionCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('ContributionCtrl', function ($scope) {
		$scope.currentPage('contribButton');
	});
