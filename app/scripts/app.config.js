/*
		Created on	: 7 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

packebianApp
	.config(["$stateProvider", "$urlRouterProvider", "lockProvider", "jwtOptionsProvider", "$locationProvider", "$httpProvider", "auth0Provider",
	function($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider, $locationProvider, $httpProvider, auth0Provider) {
		/*
		 * Inspired by Angular official examples :
		 * https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/08-Calling-Api
		 */
		/* Routes */
		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "views/login.html",
			})
			.state("search", {
				url: "/search",
				templateUrl: "views/search.html",
				controller: "SearchCtrl",
				controllerAs: "search",
				authenticate: true
			})
			.state("tickets", {
				url: "/tickets",
				templateUrl: "views/tickets.html",
				controller: "TicketsCtrl",
				controllerAs: "tickets",
				authenticate: true
			})
			.state("contribution", {
				url: "/contribution",
				templateUrl: "views/contribution.html",
				controller: "ContributionCtrl",
				controllerAs: "contrib",
				authenticate: true
			})
			.state("faq", {
				url: "/faq",
				templateUrl: "views/faq.html",
				controller: "FaqCtrl",
				controllerAs: "faq",
				authenticate: true
			});
		$urlRouterProvider.otherwise("/search");

		/* auth0 - lock */
		lockProvider.init({
			clientID: "kMnc5fUisauwQfrcGsDiD100PhRGy8KY",
			domain: "packebian.eu.auth0.com"
		});

		/* angular-jwt */
		jwtOptionsProvider.config({
			tokenGetter: ["options", auth0Provider.tokenGetter],
			whiteListedDomains: ["localhost"],
			unauthenticatedRedirectPath: "/"
		});

		$locationProvider.html5Mode(true);

		// Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix("");

		// Add the jwtInterceptor to the array of HTTP interceptors
		// so that JWTs are attached as Authorization headers
		$httpProvider.interceptors.push("jwtInterceptor");
	}]);
