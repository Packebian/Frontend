/*
		Created on	: 7 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @argument $scope
 * @description
 * # frontendApp
 * Main module of the application.
 */
var frontendApp = angular.module('frontendApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	]);

frontendApp
	.controller('ControllerMain', function ControllerMain($http, $scope) {
	/*Adresse de l'API*/
	var apiAddress = 'http://192.168.99.100:1337';
	$scope.getApiAddress = function(target) {
		return apiAddress + target;
	};

	/*Variables d'affichage*/
	$scope.displayVal = false;

	/*Privilèges administrateur*/
	$scope.isAdmin = function(user) {
		if(user === 'laRoulade') {
			return true;
		}
		else {
			return false;
		}
	};

	/*Mise à jour de la page courrante*/
	$scope.currentPage = function(page) {
		if ($scope.display) {
			document.getElementById('searchButton').className = '';
			document.getElementById('ticketsButton').className = '';
			document.getElementById('contribButton').className = '';
			document.getElementById('faqButton').className = '';
			document.getElementById(page).className = 'current-page';
		}
	};
})
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
				//controllerAs: 'login'
			})
			.when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchCtrl'
				//controllerAs: 'search'
			})
			.when('/tickets', {
				templateUrl: 'views/tickets.html',
				controller: 'TicketsCtrl'
				//controllerAs: 'tickets'
			})
			.when('/contribution', {
				templateUrl: 'views/contribution.html',
				controller: 'ContributionCtrl'
				//controllerAs: 'contribution'
			})
			.when('/faq', {
				templateUrl: 'views/faq.html',
				controller: 'FaqCtrl'
				//controllerAs: 'faq'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
