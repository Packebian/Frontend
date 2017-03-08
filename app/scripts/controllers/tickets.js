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

		var vm = this;
		this.data = [];

		/* Variables utilisés pour le tri */
		this.filtre = '';
		this.search = {};
		this.searchFilter = {};
		this.userQuery = '';
		this.searchOn = '$';

		/*Critères de tri*/
		this.orderByMe = function(x) {
			vm.order = x;
		};
		this.changeFilterTo = function(pr) {
			vm.filtre = pr;
		};
		this.setSearchFilter = function() {
			vm.searchFilter = {};
			vm.searchFilter[vm.searchOn] = vm.userQuery;
		};

		$http.get($scope.getApiAddress('/tickets')).then(function(data) {
			vm.data = data.data;
		}, function(error) {
			console.log(error);
		});

	});
