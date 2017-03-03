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
	var apiAddress = 'http://192.168.56.1:1338';
	$scope.getApiAddress = function(target) {
		return apiAddress + target;
	};
	
	/*Variables d'affichage*/
	$scope.displayNav = false;
	$scope.displayVal = false;
	
	/*Récupération des packages*/
	$scope.packages = [];
	$http.get('../json/packages.json').then(function(data) {
		$scope.packages = data.data;
	}, function(data) {
		console.log(data);
	});
	
	/*Récupération des tickets*/
	$scope.tickets = [];
	$http.get('../json/tickets.json').then(function(data) {
		$scope.tickets = data.data;
	}, function(data) {
		console.log(data);
	});
   
	/*Critères de tri*/
	$scope.orderByMe = function(x) {
		$scope.order = x;
	};
	$scope.filtre = '$';
	$scope.search = {name:'', class:'', $:''};
	$scope.changeFilterTo = function(pr) {
		$scope.filtre = pr;
	};
	$scope.setSearchFilter = function() {
		$scope.searchFilter = {};
		$scope.searchFilter[$scope.searchOn] = $scope.userQuery;
	};
	
	/*Fonction de login*/
	$scope.login = function() {
		var bypass = false;
		$scope.username = '';
		$scope.password = '';
		if(!bypass) {
			$scope.username = document.getElementById('username').value;
			$scope.password = document.getElementById('password').value;
		}
		else {
			$scope.username = 'laRoulade';
			$scope.password = 'RAVH';
		}

		if($scope.password == 'RAVH') {
			$scope.$parent.$parent.displayNav = true;
		}
		else {
			document.getElementById('form').innerHTML += 'Échec d\'authentification';
		}
		if($scope.username == 'laRoulade') {
			$scope.$parent.$parent.displayVal = true;
		}
	};
	
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
		console.log('titi');
		if ($scope.display) {
			document.getElementById('searchButton').className = '';
			document.getElementById('ticketsButton').className = '';
			document.getElementById('contribButton').className = '';
			document.getElementById('faqButton').className = '';
			document.getElementById(page).className = 'current-page';
		}
	};
	
	/*Affichage des Tutoriels*/
	$scope.displayTutos = function() {
		$http.get('../json/tutos.json').then(function(data) {
			var tutos = data.data;
			for(var i = 0; i < tutos.length; i++) {
				var tutorial = '';
				tutorial += '<h3>' + tutos[i].name + '</h3>';
				tutorial += '<p>' + tutos[i].content + '</p>';
				document.getElementById('tutorials').innerHTML += tutorial;
			}
		}, function Error(data) {
			console.log(data);
		});
	};
	
	/*Affichage de la FAQ*/
	$scope.displayFaq = function() {
		$http.get('../json/faq.json').then(function(data) {
			var faq = data.data;
			for(var i = 0; i < faq.length; i++) {
				var question = '';
				question += '<h3>' + faq[i].question + '</h3>';
				question += '<p>' + faq[i].answer + '</p>';
				document.getElementById('faq').innerHTML += question;
			}
		}, function Error(data) {
			console.log(data);
		});
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