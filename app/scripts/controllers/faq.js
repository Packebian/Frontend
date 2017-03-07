/*
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:FaqCtrl
 * @argument $scope
 * @description
 * # FaqCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('FaqCtrl', function ($scope, $http) {
		$scope.currentPage('faqButton');

		/*Affichage des Tutoriels*/
		function displayTutos() {
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
		}

		/*Affichage de la FAQ*/
		function displayFaq () {
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
		}

		displayTutos();
		displayFaq();
	});
