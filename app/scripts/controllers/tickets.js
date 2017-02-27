/* 
		Created on	: 16 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

'use strict';

var tickets;

$.getJSON('../../json/tickets.json', function(data) {
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
	tickets = JSON.parse(jsonFormate);
	*/
	tickets = data;
});

/**
 * @ngdoc function
 * @name frontendApp.controller:TicketsCtrl
 * @description
 * # TicketsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('TicketsCtrl', function ($scope) {
		$scope.tickets = tickets;
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

function displayValidation() {
	if (isAdmin(document.getElementById('username').value)) {
		var titles = '<th style = "text-align: center" ng-click="orderByMe(' + "'" + 'vote' + "'" + ')">Validation</th>';
		var rows = '<td class ="cellB"><input type="button" value="Valider"></td>';
		document.getElementById("rowTitles").innerHTML += titles;
		document.getElementById("rows").innerHTML += rows;
	}
}