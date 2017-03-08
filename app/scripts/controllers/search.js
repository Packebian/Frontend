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
	.controller('SearchCtrl', ['$scope', '$http', 'Environment', function ($scope, $http, Environment) {

		var vm = this;
		vm.data = [];

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

		$http.get(Environment.getApiAddress('/packages')).then(function(data) {
			vm.data = data.data;
		}, function(error) {
			console.log(error);
		});

	}]);
