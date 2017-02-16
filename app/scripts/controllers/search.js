/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

var packages;

$.getJSON('../../json/packages.json', function(data) {
	/*
	var jsonFormate = '[';
	for (var d in data) {
		jsonFormate += '{';
		jsonFormate += '"name" : "' + (data[d].infos.name) + '",';
		jsonFormate += '"class" : "' + (data[d].infos.class) + '",';
		jsonFormate += '"major" : "' + (data[d].infos.major) + '",';
		jsonFormate += '"maintainer" : "' + (data[d].infos.maintainer) + '"}';
		if (d != data.length - 1) {
			jsonFormate += ',';
		}
	}
	jsonFormate += ']';
	packages = JSON.parse(jsonFormate);
	*/
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

