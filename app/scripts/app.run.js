"use strict";
/*
 * Highly inspired by Angular official documentation
 * https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/08-Calling-Api
 */
packebianApp
  .controller("MainCtrl", ["$rootScope", "$scope", "$location", "authManager", "auth0Service", "lock", "$state",
  function MainCtrl($rootScope, $scope, $location, authManager, auth0Service, lock, $state) {

    var vm = this;

    /*Variables d'affichage*/
    $scope.displayVal = false;

    /*Current page*/
    this.currentPage = function(path) {
      return ($location.path().substr(0, path.length) === path) ? "current-page" : "";
    };

    auth0Service.getDeferredUserInfos().then(function (userInfos) {
      vm.userInfos = userInfos;
    });

    auth0Service.getDeferredLogout().then(function () {
      vm.userInfos = null;
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

    // Register synchronous hash parser
    lock.interceptHash();

    /* Force unauthenticated users to be redirected to home page */
    $rootScope.$on("$stateChangeStart", function(event, toState){
      if (toState.authenticate && !authManager.isAuthenticated()){
        $state.go("home");
        event.preventDefault();
      }
    });

    this.login = function(){
      auth0Service.login();
    };

    this.logout = function(){
      auth0Service.logout();
    };

  }]);
