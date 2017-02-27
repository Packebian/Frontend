/* 
	Created on	: 7 févr. 2017, 09:58:32
	Author		: Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('LoginCtrl', function () {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});

function login() {
	var bypass = true;
	if(!bypass) {
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
	}
	else {
		var username = "laRoulade";
		var password = "RAVH";
	}

	if(password === "RAVH") {
		displayNavBar();
	}
	else {
		document.getElementById("form").innerHTML += "Échec d'authentification";
	}
}

function displayNavBar() {
	var html	 = '<li id = "searchButton"><a href="/#!/search" onclick="currentPage(' + "'" + 'searchButton' + "'" + ');">Liste des Packages</a></li>';
	html		+= '<li id = "ticketsButton"><a href="/#!/tickets" onclick="currentPage('+ "'" + 'ticketsButton' + "'" + ');">Liste des Tickets</a></li>';
	html		+= '<li id = "contribButton"><a href="/#!/contribution" onclick="currentPage(' + "'" + 'contribButton' + "'" + ');">Contribution</a></li>';
	html		+= '<li id = "faqButton"><a href="/#!/faq" onclick="currentPage(' + "'" + 'faqButton' + "'" + ');">FAQ / Tutoriels</a></li>';
	document.getElementById("navbarPages").innerHTML = html;
}