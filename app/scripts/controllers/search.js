/* 
    Created on : 7 févr. 2017, 09:58:32
    Author     : Germain Lecorps and Régis Ramel
*/

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SearchCtrl', function ($scope) {
	  $scope.friends = [
	    { name: "Peter",   age: 20 },
	    { name: "Pablo",   age: 55 },
	    { name: "Linda",   age: 20 },
	    { name: "Marta",   age: 37 },
	    { name: "Othello", age: 20 },
	    { name: "Markus",  age: 32 }
	  ];
	this.awesomeThings = [
	  'HTML5 Boilerplate',
	  'AngularJS',
	  'Karma'
	];
  });

