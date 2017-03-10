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
		"auth0.lock",
		"angular-jwt",
		"ui.router"
	]);

packebianApp
	.config(["$stateProvider", "$urlRouterProvider", "lockProvider", "jwtOptionsProvider", "$locationProvider", "$httpProvider",
	function($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider, $locationProvider, $httpProvider) {
		/*
		 * Inspired by Angular official examples :
		 * https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/08-Calling-Api
		 */
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
		$urlRouterProvider.otherwise('/login');

		/* auth0 - lock */
		lockProvider.init({
			clientID: "kMnc5fUisauwQfrcGsDiD100PhRGy8KY",
			domain: "packebian.eu.auth0.com"
		});

		/* angular-jwt */
		jwtOptionsProvider.config({
			tokenGetter: ["options", function (options) {
				if (options && options.url.substr(options.url.length - 5) === ".html") {
					return null;
				}
				return localStorage.getItem("id_token");
			}],
			whiteListedDomains: ["localhost"],
			// unauthenticatedRedirectPath: "/login"
		});

		$locationProvider.html5Mode(true);

		// Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix('');

		// Add the jwtInterceptor to the array of HTTP interceptors
		// so that JWTs are attached as Authorization headers
		$httpProvider.interceptors.push("jwtInterceptor");
	}]);
