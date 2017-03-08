/*
		Created on	: 7 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc overview
 * @name packebianApp
 * @argument $scope
 * @description
 * # frontendApp
 * Main module of the application.
 */
var packebianApp = angular.module('packebianApp', [
		'ngRoute',
	]);

packebianApp
	.controller('ControllerMain', function ControllerMain($scope, $location) {

		/*Variables d'affichage*/
		$scope.displayVal = false;

		/*Privilèges administrateur*/
		this.isAdmin = function(user) {
			if(user === 'laRoulade') {
				return true;
			} else {
				return false;
			}
		};

		/*Current page*/
		this.currentPage = function(path) {
			return ($location.path().substr(0, path.length) === path) ? 'current-page' : '';
		};
	})
	.config(function ($routeProvider, angularAuth0Provider) {
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
