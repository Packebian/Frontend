/* 
		Created on : 7 févr. 2017, 09:58:32
		Author		 : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:FaqCtrl
 * @description
 * # FaqCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
	.controller('FaqCtrl', function () {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});

function displayTutos() {
	$.getJSON("../json/tutos.json", function(tutos){
		for(var t in tutos) {
			var tutorial = "";
			tutorial += "<h3>" + tutos[t].name + "</h3>";
			tutorial += "<p>" + tutos[t].content + "</p>";
			document.getElementById("tutorials").innerHTML += tutorial;
		}
	});
}

function displayFaq() {
	$.getJSON("../json/faq.json", function(faq){
		for(var q in faq) {
			var question = "";
			question += "<h3>" + faq[q].question + "</h3>";
			question += "<p>" + faq[q].answer + "</p>";
			document.getElementById("faq").innerHTML += question;
		}
	});
}