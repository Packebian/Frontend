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
	.controller('ControllerMain', function ControllerMain($scope, $location, $http) {

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

	/*Correct page*/
	$scope.currentPage = function(path) {
		return ($location.path().substr(0, path.length) === path) ? 'current-page' : '';
	};
})
	.config(function ($routeProvider) {
		/* Routes */
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
				controllerAs: 'contrib'
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
