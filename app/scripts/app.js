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
