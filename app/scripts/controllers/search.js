/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

var packages;

$.getJSON('../../json/packages.json', function(data) {
	packages = data;
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
		$scope.packages = packages;
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	$scope.orderByMe = function(x) {
		$scope.order = x;
	};
		$scope.filtre = "$";
		$scope.search = {name:'', class:'', $:''};
	$scope.changeFilterTo = function(pr) {
		$scope.filtre = pr;
	};
	$scope.setSearchFilter = function()
	{
		$scope.searchFilter = {};
		$scope.searchFilter[$scope.searchOn] = $scope.userQuery;
	};
});

