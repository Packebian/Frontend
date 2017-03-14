/*
	Created on	: 7 févr. 2017, 09:58:32
	Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name frontendApp.controller:SearchCtrl
 * @argument $http
 * @argument Environment
 * @description
 * # SearchCtrl
 * Controller of the frontendApp
 */
packebianApp
	.controller("SearchCtrl", ["$http", "Environment", function ($http, Environment) {
		var vm = this;
		vm.data = [];

		//Sort variables
		this.filtre = "";
		this.search = {};
		this.searchFilter = {};
		
		//Query entered by the user in search.js
		this.userQuery = "";
		//Order criteria selected by the user in search.js
		this.searchOn = "$";

		/**
		 * @param {type} x : order criteria
		 * @returns {undefined}
		 */
		this.orderByMe = function(x) {
			//Set order criteria
			vm.order = x;
		};
		
		/**
		 * @param {type} pr : filter criteria
		 * @returns {undefined}
		 */
		this.changeFilterTo = function(pr) {
			//Set filter criteria
			vm.filtre = pr;
		};
		
		/**
		 * @returns {undefined}
		 */
		this.setSearchFilter = function() {
			vm.searchFilter = {};
			//Execute the request
			vm.searchFilter[vm.searchOn] = vm.userQuery;
		};

		//Packages obtention via API
		$http.get(Environment.getApiAddress("/packages")).then(function(data) {
			vm.data = data.data;
		}, function(error) {
			console.log(error);
		});
	}]);
