/*
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SearchCtrl
 * @argument $scope
 * @description
 * # SearchCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('SearchCtrl', function ($scope, $http) {

		/* Récupération des packages */
		$scope.packages = [];

		/*Critères de tri*/
		$scope.orderByMe = function(x) {
			$scope.order = x;
		};
		$scope.filtre = '$';
		$scope.search = {name:'', class:'', $:''};
		$scope.changeFilterTo = function(pr) {
			$scope.filtre = pr;
		};
		$scope.setSearchFilter = function() {
			$scope.searchFilter = {};
			$scope.searchFilter[$scope.searchOn] = $scope.userQuery;
		};

		//$http.get('../json/packages.json').then(function(data) {
		$http.get($scope.getApiAddress('/packages')).then(function(data) {
			$scope.packages = data.data;
		}, function(error) {
			console.log(error);
		});

	});
