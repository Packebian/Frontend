/*
	Created on	: 7 févr. 2017, 09:58:32
	Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:ContributionCtrl
 * @argument $scope
 * @argument $http
 * @argument Environment
 * @description
 * # ContributionCtrl
 * Controller of the frontendApp
 */
packebianApp
	.controller("ContributionCtrl", ["$state", "$scope", "$http", "Environment", 
	function ($state, $scope, $http, Environment) {
		/**
		 * @param {type} user : user who posts the tickets
		 * @returns {undefined}
		 */
		$scope.contribution = function(user) {
			var method = "POST";
			var url = Environment.getApiAddress("/tickets/");
			//Major obtention
			var major = "";
			var majors = document.getElementsByName("major_package");
			for (var i = 0, length = majors.length; i < length; i++) {
				if (majors[i].checked) {
					major = majors[i].value;
					break;
				}
			}

			//Content of the POST request
			var req = {
				method: method,
				url: url,
				data: {
					"user": $scope.main.userInfos.user.id,
					"name": document.getElementById("name_package").value,
					"maintainer": document.getElementById("maintainer_package").value,
					"architecture": document.getElementById("architecture_package").value,
					"major": major,
					"class": document.getElementById("class_package").value,
					"description": document.getElementById("message_package").value,
					"dependencies": document.getElementById("dependance_package").value,
					"versions": [document.getElementById("version_package").value]
				},
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				}
			};

			//HTTP POST Request
			$http(req).then(function(data) {
				$state.go("tickets");
			}, function(data) {
				console.log(data);
			});
		};
	}]);
