/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

var liste;
$.getJSON('../../json/liste.json', function(data) { 
		liste = data;
	});
	

/**
 * @ngdoc function
 * @name frontendApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('SearchCtrl', function ($scope) {
		$scope.packages = liste;
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	$scope.orderByMe = function(x) {
		$scope.order = x;
	}
});

