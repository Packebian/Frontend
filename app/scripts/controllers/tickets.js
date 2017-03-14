/*
	Created on	: 16 févr. 2017, 09:58:32
	Author		: Germain Lecorps and Régis Ramel
*/

"use strict";

/**
 * @ngdoc function
 * @name packebianApp.controller:TicketsCtrl
 * @argument $scope
 * @argument $http
 * @argument Environment
 * @description
 * # TicketsCtrl
 * Controller of the packebianApp
 */
packebianApp
	.controller("TicketsCtrl", ["$scope", "$http", "Environment",
	function ($scope, $http, Environment) {

		var vm = this;
		this.data = [];

		//Sort variables
		this.filtre = "";
		this.search = {};
		this.searchFilter = {};

		//Query entered by the user in tickets.js
		this.userQuery = "";
		//Order criteria selected by the user in search.js
		this.searchOn = "$";

		/**
		 * @param {type} x : order criteria
		 * @returns {undefined}
		 */
		this.orderByMe = function(x) {
			/*Set order criteria*/
			vm.order = x;
		};

		/**
		 * @param {type} pr : filter criteria
		 * @returns {undefined}
		 */
		this.changeFilterTo = function(pr) {
			//Set filter criteria
			vm.filtre = pr;
		};

		/**
		 * @returns {undefined}
		 */
		this.setSearchFilter = function() {
			vm.searchFilter = {};
			/*Execute the request*/
			vm.searchFilter[vm.searchOn] = vm.userQuery;
		};

		//Packages obtention via API
		$http.get(Environment.getApiAddress("/tickets")).then(function(data) {
			vm.data = data.data;
			var i = 0;

			/**
			 * @param {type} num : number of the ticket
			 * @returns {undefined}
			 */
			var getVotesUser = function(num) {
				//Get the votes of the current user
				$http.get(Environment.getApiAddress("/tickets/" + vm.data[num].id + "/votes?where={\"user\":" + $scope.main.userInfos.user.id + "}")).then(function(data) {
					//Check if the votes list is empty
					if (data.data.length !== 0) {
						//Add the vot to vm.data
						vm.data[num].voteId = data.data[0].id;
						vm.data[num].voteValue = data.data[0].vote;
					}
				}, function(error) {
					console.log(error);
				});
			};

			//Add all votes of user
			for (i = 0; i < vm.data.length; i++) {
				getVotesUser(i);
			}
		}, function(error) {
			console.log(error);
		});

		/**
		 * @param {type} ticketId : The id of the ticket to add a vote
		 * @param {type} voteType : The type of vote to add (up, down, neutral)
		 * @param {type} user : The user who add the vote
		 * @returns {undefined}
		 */
		this.vote = function(ticketId, voteType, user) {
			var method = "POST";
			var voteId = "";
			var voteValue = voteType;
			//Check if there is already a vote of that user
			if (vm.data[ticketId-1].voteId !== undefined) {
				method = "PUT";
				voteId = vm.data[ticketId-1].voteId;
				//Check if the vote required is the same as the previous
				if (voteValue === vm.data[ticketId-1].voteValue) {
					voteValue = 0;
				}
			}

			//Construvtion of the POST/PUT request
			var url = "";
			if (method === "POST") {
				url = Environment.getApiAddress("/votes/");
			}
			else {
				url = Environment.getApiAddress("/votes/" + voteId);
			}
			var req;
			//POST request
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
			//PUT request
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

			//Execution of the request
			$http(req).then(function(data) {
				//Update vm.data
				vm.data[ticketId-1].voteId = data.data.id;
				vm.data[ticketId-1].voteValue = data.data.vote;
				//Update the votes results in the tickets.html view
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
