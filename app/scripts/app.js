/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
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
	
	/*Affichage des boutons dans la navbar*/
	$scope.displayNavBar = function() {
		var html	 = '<li id = "searchButton"><a href="/#!/search" ng-click="currentPage(' + '\'' + 'searchButton' + '\'' + ');">Liste des Packages</a></li>';
		html		+= '<li id = "ticketsButton"><a href="/#!/tickets" ng-click="currentPage('+ '\'' + 'ticketsButton' + '\'' + ');">Liste des Tickets</a></li>';
		html		+= '<li id = "contribButton"><a href="/#!/contribution" ng-click="currentPage(' + '\'' + 'contribButton' + '\'' + ');">Contribution</a></li>';
		html		+= '<li id = "faqButton"><a href="/#!/faq" ng-click="currentPage(' + '\'' + 'faqButton' + '\'' + ');">FAQ / Tutoriels</a></li>';
		document.getElementById('navbarPages').innerHTML = html;
	};
	
	/*Fonction de login*/
	$scope.login = function() {
		var bypass = true;
		var username;
		var password;
		if(!bypass) {
			username = document.getElementById('username').value;
			password = document.getElementById('password').value;
		}
		else {
			username = 'laRoulade';
			password = 'RAVH';
		}

		if(password === 'RAVH') {
			$scope.displayNavBar();
		}
		else {
			document.getElementById('form').innerHTML += 'Échec d\'authentification';
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
	
	/* Affichage de bouton "Valider"*/
	$scope.displayValidation = function() {
		
		/*if ($scope.isAdmin(document.getElementById('username').value)) {
			var titles = '<th style = "text-align: center" ng-click="orderByMe(' + '\'' + 'vote' + '\'' + ')">Validation</th>';
			var rows = '<td class ="cellB"><input type="button" value="Valider"></td>';
			document.getElementById('rowTitles').innerHTML += titles;
			document.getElementById('rows').innerHTML += rows;
		}*/
	};
	
	/*Mise à jour de la page courrante*/
	$scope.currentPage = function(page) {
		console.log('currentPage :' + page + ' Connard !!');
		document.getElementById('searchButton').className = '';
		document.getElementById('ticketsButton').className = '';
		document.getElementById('contribButton').className = '';
		document.getElementById('faqButton').className = '';
		document.getElementById(page).className = 'current-page';
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