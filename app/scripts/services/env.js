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
		// AngularJS will instantiate a singleton by calling "new" on this function
		var env = "http://localhost:9000";
		var apiAddress = "http://192.168.56.1:1338";

		/**
		 * @returns {string} the environment url
		 */
		this.getEnvironment = function() {
				return env;
		};


		/**
		 * @returns {string} the api address along the path 'target‘ if provided
		 */
		this.getApiAddress = function(target) {
			return apiAddress + target;
		};
	});
