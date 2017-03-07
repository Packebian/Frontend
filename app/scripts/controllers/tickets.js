/*
		Created on	: 16 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TicketsCtrl
 * @argument $scope
 * @description
 * # TicketsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('TicketsCtrl', function ($scope, $http) {

		/*Récupération des tickets*/
		$scope.tickets = [];

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

		//$http.get('../json/tickets.json').then(function(data) {
		$http.get($scope.getApiAddress('/tickets')).then(function(data) {
			$scope.tickets = data.data;
		}, function(error) {
			console.log(error);
		});

	});
