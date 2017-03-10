/*
  Created on	: 7 févr. 2017, 09:58:32
  Author		: Germain Lecorps and Régis Ramel
*/

"use strict";
/**
 * @ngdoc function
 * @name packebianApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the packebianApp
 */
packebianApp
  .controller("LoginCtrl", ["auth0Service", function (auth0Service) {

    this.login = function(){
      auth0Service.login();
    };

    this.logout = function(){
      auth0Service.logout();
    };
  }]);
