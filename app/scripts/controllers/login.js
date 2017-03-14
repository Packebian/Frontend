/*
	Created on	: 7 févr. 2017, 09:58:32
	Author		: Germain Lecorps and Régis Ramel
*/

"use strict";
/**
 * @ngdoc function
 * @name packebianApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the packebianApp
 */
packebianApp
	.controller("LoginCtrl", function ($scope, $location) {
		/**
		 * @returns {undefined}
		 */
		this.login = function() {
			//var bypass used fo testing, allows to skip the authentication phase
			var bypass = false;
			$scope.username = "";
			$scope.password = "";
			if(bypass) {
				$scope.$parent.displayVal = true;
				$location.path("/search");
				return;
			}
			
			//Login parameters
			var realUsername = document.getElementById("username").value;
			var realPassword = document.getElementById("password").value;

			if(realUsername === "laRoulade" && realPassword === "RAVH") {
				$scope.$parent.displayVal = true;
				$location.path("/search");
			} else {
				document.getElementById("form").innerHTML += "Échec d\'authentification";
			}
		};
	});
