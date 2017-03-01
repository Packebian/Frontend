/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

var apiAddress = "http://192.168.56.1:1338";

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
var frontendApp = angular
	.module('frontendApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function ($routeProvider, $httpProvider) {
		//$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
		$routeProvider
			.when('/', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'login'
			})
			.when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchCtrl',
				controllerAs: 'search'
			})
			.when('/tickets', {
				templateUrl: 'views/tickets.html',
				controller: 'TicketsCtrl',
				controllerAs: 'tickets'
			})
			.when('/contribution', {
				templateUrl: 'views/contribution.html',
				controller: 'ContributionCtrl',
				controllerAs: 'contribution'
			})
			.when('/faq', {
				templateUrl: 'views/faq.html',
				controller: 'FaqCtrl',
				controllerAs: 'faq'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

/*
frontendApp.factory('apiAddresses', function() {
	return {
		apiAddress : "192.168.56.1:1338",
		apiUsers : apiAddress + "/users",
		apiTikets : apiAddress + "/tickets",
		apiVotes : apiAddress + "/votes",
		apiPackages : apiAddress + "/packages",
		apiBuilds : apiAddress + "/builds",
		apiMesscages : apiAddress + "/messages"
	};
});*/

function currentPage(page) {
	document.getElementById('searchButton').className = '';
	document.getElementById('ticketsButton').className = '';
	document.getElementById('contribButton').className = '';
	document.getElementById('faqButton').className = '';
	document.getElementById(page).className = 'current-page';
}

function isAdmin(user) {
	if(user === "laRoulade") {
		return true;
	}
	else {
		return false;
	}
}

function getApiAddress(target) {
	return apiAddress + target;
}