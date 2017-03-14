/*
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:FaqCtrl
 * @argument $http
 * @description
 * # FaqCtrl
 * Controller of the frontendApp
 */
packebianApp
	.controller("FaqCtrl", function ($http) {
		var vm = this;
		this.tutos = [];
		this.faqs = [];

		//Tutorials obtention
		$http.get("../json/tutos.json").then(function(data) {
			vm.tutos = data.data;
		}, function(data) {
			console.log(data);
		});

		//FAQ obtention
		$http.get("../json/faq.json").then(function(data) {
			vm.faqs = data.data;
		}, function(data) {
			console.log(data);
		});

	});
