/*
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:FaqCtrl
 * @argument $scope
 * @description
 * # FaqCtrl
 * Controller of the frontendApp
 */
packebianApp
	.controller("FaqCtrl", function ($http) {

		var vm = this;
		this.tutos = [];
		this.faqs = [];

		/* Récupère les tutos */
		$http.get("../json/tutos.json").then(function(data) {
			vm.tutos = data.data;
		}, function Error(data) {
			console.log(data);
		});

		/* Récupère les FAQs */
		$http.get("../json/faq.json").then(function(data) {
			vm.faqs = data.data;
		}, function Error(data) {
			console.log(data);
		});

	});
