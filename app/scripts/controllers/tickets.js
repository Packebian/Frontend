/* 
		Created on	: 16 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TicketsCtrl
 * @description
 * # TicketsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('TicketsCtrl', function ($scope, $http) {
	$scope.orderByMe = function(x) {
		$scope.order = x;
	};
	$scope.filtre = "$";
	$scope.search = {name:'', class:'', $:''};
	$scope.changeFilterTo = function(pr) {
		$scope.filtre = pr;
	};
	$scope.setSearchFilter = function() {
		$scope.searchFilter = {};
		$scope.searchFilter[$scope.searchOn] = $scope.userQuery;
	};
	$scope.tickets = tickets;
});

function displayValidation() {
	if (isAdmin(document.getElementById('username').value)) {
		var titles = '<th style = "text-align: center" ng-click="orderByMe(' + "'" + 'vote' + "'" + ')">Validation</th>';
		var rows = '<td class ="cellB"><input type="button" value="Valider"></td>';
		document.getElementById("rowTitles").innerHTML += titles;
		document.getElementById("rows").innerHTML += rows;
	}
}

var tickets;

$.getJSON('http://192.168.56.1:1338/tickets', function(data) {
	tickets = data;
});