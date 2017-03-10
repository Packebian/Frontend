/*
		Created on	: 16 févr. 2017, 09:58:32
		Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:TicketsCtrl
 * @argument $scope
 * @description
 * # TicketsCtrl
 * Controller of the packebianApp
 */
packebianApp
	.controller("TicketsCtrl", ["$scope", "$http", "Environment", function ($scope, $http, Environment) {
		var vm = this;
		this.data = [];

		/* Variables utilisés pour le tri */
		this.filtre = "";
		this.search = {};
		this.searchFilter = {};
		this.userQuery = "";
		this.searchOn = "$";

		/*Critères de tri*/
		this.orderByMe = function(x) {
			vm.order = x;
		};
		this.changeFilterTo = function(pr) {
			vm.filtre = pr;
		};
		this.setSearchFilter = function() {
			vm.searchFilter = {};
			vm.searchFilter[vm.searchOn] = vm.userQuery;
		};
		var i = 0;
		$http.get(Environment.getApiAddress("/tickets")).then(function(data) {
			vm.data = data.data;
			var getVotesUser = function(num) {
				$http.get(Environment.getApiAddress("/tickets/" + vm.data[num].id + "/votes?where={\"user\":1}")).then(function(data) {
					if (data.data.length !== 0) {
						vm.data[num].voteId = data.data[0].id;
						vm.data[num].voteValue = data.data[0].vote;
					}
				}, function(error) {
					console.log(error);
				});
			};
			for (i = 0; i < vm.data.length; i++) {
				getVotesUser(i);
			}
		}, function(error) {
			console.log(error);
		});
		
		/*Rajouter un vote*/
		$scope.vote = function(ticketId, voteType, user) {
			var method = "POST";
			var voteId = "";
			var voteValue = voteType;
			if (vm.data[ticketId-1].voteId !== undefined) {
				method = "PUT";
				voteId = vm.data[ticketId-1].voteId;
				if (voteValue === vm.data[ticketId-1].voteValue) {
					voteValue = 0;
				}
			}
			
			var url = "";
			if (method === "POST") {
				url = Environment.getApiAddress("/votes/");
			}
			else {
				url = Environment.getApiAddress("/votes/" + voteId);
			}
			var req;
			if (method === "POST") {
				req = {
					method: method,
					url: url,
					data: {
						"user": user,
						"ticket": ticketId,
						"vote": voteValue
					},
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					}
				};
			}
			else {
				req = {
					method: method,
					url: url,
					data: {
						"vote": voteValue
					},
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					}
				};
			}
			
			$http(req).then(function(data) {
				vm.data[ticketId-1].voteId = data.data.id;
				vm.data[ticketId-1].voteValue = data.data.vote;
				$http.get(Environment.getApiAddress("/tickets/" + ticketId)).then(function(data) {
					document.getElementById(ticketId).innerHTML = data.data.results.upvotes - data.data.results.downvotes;
				}, function(error) {
					console.log(error);
				});
			}, function(data) {
				console.log(data);
			});
		};
	}]);