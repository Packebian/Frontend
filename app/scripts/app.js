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
		"ui.router"
	]);

packebianApp
	.controller("ControllerMain", function ControllerMain($scope, $location) {

		/*Variables d'affichage*/
		$scope.displayVal = false;

		/*Privilèges administrateur*/
		this.isAdmin = function(user) {
			if(user === "laRoulade") {
				return true;
			} else {
				return false;
			}
		};

		/*Current page*/
		this.currentPage = function(path) {
			return ($location.path().substr(0, path.length) === path) ? "current-page" : "";
		};
	})
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		/* Routes */
		$stateProvider
			.state("login", {
				url: "/login",
				templateUrl: "views/login.html",
				controller: "LoginCtrl",
				controllerAs: "login"
			})
			.state("search", {
				url: "/search",
				templateUrl: "views/search.html",
				controller: "SearchCtrl",
				controllerAs: "search"
			})
			.state("tickets", {
				url: "/tickets",
				templateUrl: "views/tickets.html",
				controller: "TicketsCtrl",
				controllerAs: "tickets"
			})
			.state("contribution", {
				url: "/contribution",
				templateUrl: "views/contribution.html",
				controller: "ContributionCtrl",
				controllerAs: "contrib"
			})
			.state("faq", {
				url: "/faq",
				templateUrl: "views/faq.html",
				controller: "FaqCtrl",
				controllerAs: "faq"
			});
			/* auth0 */
			angularAuth0Provider.init({
				clientID: "kMnc5fUisauwQfrcGsDiD100PhRGy8KY",
				domain: "packebian.eu.auth0.com"
			});
	});
		$urlRouterProvider.otherwise('/login');
		$locationProvider.html5Mode(true);
		// Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix('');
