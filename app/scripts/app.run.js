"use strict";
/*
 * Highly inspired by Angular official documentation
 * https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/08-Calling-Api
 */
packebianApp
  .controller("MainCtrl", ["$scope", "$location", "authManager", "auth0Service",
  function MainCtrl($scope, $location, authManager, auth0Service) {

    var vm = this;

    /*Variables d'affichage*/
    $scope.displayVal = false;

    /*Current page*/
    this.currentPage = function(path) {
      return ($location.path().substr(0, path.length) === path) ? "current-page" : "";
    };

    auth0Service.getDeferredUserProfile().then(function (profile) {
      vm.profile = profile;
    });

    auth0Service.getDeferredUserToken().then(function (token) {
      vm.token = token;
    });

    // Register the authentication listener that is
    // set up in serivces/auth.js
    auth0Service.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

    // Use redirectWhenUnauthenticated to redirect to unauthenticatedRedirectPath, if server returns 401.
    // set up in app.js
    authManager.redirectWhenUnauthenticated();

  }]);