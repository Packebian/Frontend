/*
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:ContributionCtrl
 * @argument $scope
 * @argument $http
 * @argument Environment
 * @description
 * # ContributionCtrl
 * Controller of the frontendApp
 */
packebianApp
	.controller("ContributionCtrl", ["$scope", "$http", "Environment", function ($scope, $http, Environment) {
		$scope.contribution = function(user) {
			var method = "POST";
			var url = Environment.getApiAddress("/tickets/");
			var req = {
				method: method,
				url: url,
				data: {
					"user": user,
					"name": "toto",
					"maintainer": "naida@nichols.net",
					"architecture": "all",
					"major": "RICM3",
					"class": "ALM",
					"description": "Code you processor",
					"dependencies": "gcc",
					"versions": [
						"1.0",
						"1.1",
						"1.2"
					]
				},
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				}
			};
			
			$http(req).then(function(data) {
				console.log(data);
			}, function(data) {
				console.log(data);
			});
		};
	}]);
