/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

var liste;
var fromage;
/*
$.getJSON('../../json/liste.json', function(data) { 
		liste = data;
	});
	*/
$.getJSON('../../json/fromage.json', function(data) { 
		fromage = data;
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
		$scope.packages = fromage;
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	$scope.orderByMe = function(x) {
		$scope.order = x;
	}
    $scope.filtre = "$";
		$scope.search = {name:'', class:'', $:''};
	$scope.changeFilterTo = function(pr) {
    	$scope.filtre = pr; 
    }
    $scope.setSearchFilter = function()
    {
        $scope.searchFilter = {};
        $scope.searchFilter[$scope.searchOn] = $scope.userQuery;
    }



});

