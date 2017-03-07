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
	.controller('LoginCtrl', function ($scope) {
		$scope.view = 'login';
		/*Fonction de login*/
		$scope.login = function() {
			var bypass = true;
			$scope.username = '';
			$scope.password = '';
			if(bypass) {
				$scope.$parent.displayVal = true;
				return;
			}

			var realUsername = document.getElementById('username').value;
			var realPassword = document.getElementById('password').value;

			if(realUsername === 'laRoulade' && realPassword === 'RAVH') {
				$scope.$parent.displayVal = true;
			} else {
				document.getElementById('form').innerHTML += 'Échec d\'authentification';
			}
		};
	});
