"use strict";

/**
 * @ngdoc service
 * @name Packebian.env
 * @description
 * # Environment
 * Service in the Packebian app.
 */
packebianApp
	.service("Environment", function Environment() {
		//AngularJS will instantiate a singleton by calling "new" on this function
		var apiAddress = "API_URL";

		/**
		 * @returns {string} : The api address along the path 'target‘ if provided
		 */
		this.getApiAddress = function(target) {
			return apiAddress + target;
		};
	});
