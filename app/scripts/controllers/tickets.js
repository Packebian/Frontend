/*
		Created on	: 16 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:TicketsCtrl
 * @argument $scope
 * @description
 * # TicketsCtrl
 * Controller of the packebianApp
 */
packebianApp
	.controller("TicketsCtrl", ["$http", "Environment", function ($http, Environment) {

		var vm = this;
		this.data = [];

		/* Variables utilisés pour le tri */
		this.filtre = "";
		this.search = {};
		this.searchFilter = {};
		this.userQuery = "";
		this.searchOn = "$";

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

		$http.get(Environment.getApiAddress("/tickets")).then(function(data) {
			vm.data = data.data;
		}, function(error) {
			console.log(error);
		});

	}]);
