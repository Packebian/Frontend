/*
		Created on	: 7 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc overview
 * @name packebianApp
 * @argument $scope
 * @description
 * # frontendApp
 * Main module of the application.
 */
var packebianApp = angular.module("packebianApp", [
		"ngRoute",
		"auth0.auth0"
	]);

packebianApp
	.controller("ControllerMain", function ControllerMain($scope, $location) {
		//Current user
		$scope.user = 1;
		
		//Display variables
		$scope.displayVal = false;

		/**
		 * @param {type} user : User to check admin status
		 * @returns {Boolean}
		 */
		this.isAdmin = function(user) {
			if(user === "laRoulade") {
				return true;
			} else {
				return false;
			}
		};

		/**
		 * @param {type} path : Path to the page
		 * @returns {String}
		 */
		this.currentPage = function(path) {
			return ($location.path().substr(0, path.length) === path) ? "current-page" : "";
		};
	})
	.config(function ($routeProvider, angularAuth0Provider) {
		/* Routes */
		$routeProvider
			.when("/", {
				templateUrl: "views/login.html",
				controller: "LoginCtrl",
				controllerAs: "login"
			})
			.when("/search", {
				templateUrl: "views/search.html",
				controller: "SearchCtrl",
				controllerAs: "search"
			})
			.when("/tickets", {
				templateUrl: "views/tickets.html",
				controller: "TicketsCtrl",
				controllerAs: "tickets"
			})
			.when("/contribution", {
				templateUrl: "views/contribution.html",
				controller: "ContributionCtrl",
				controllerAs: "contrib"
			})
			.when("/faq", {
				templateUrl: "views/faq.html",
				controller: "FaqCtrl",
				controllerAs: "faq"
			})
			.otherwise({
				redirectTo: "/"
			});
			/* auth0 */
			angularAuth0Provider.init({
				clientID: "kMnc5fUisauwQfrcGsDiD100PhRGy8KY",
				domain: "packebian.eu.auth0.com"
			});
	});
