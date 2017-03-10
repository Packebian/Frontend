"use strict";

/**
 * @ngdoc service
 * @name Packebian.auth0Service
 * @description
 * # Environment
 * Service in the Packebian app.
 */
packebianApp
  .service("auth0Service", ["$rootScope", "lock", "authManager", "$state", "$q",
  function auth0Service($rootScope, lock, authManager, $state, $q) {

    var vm = this;

    vm.STORAGE_PROFILE = "profile";
    vm.STORAGE_TOKEN = "token";

    var userProfile = JSON.parse(localStorage.getItem(vm.STORAGE_PROFILE)) || null;
    var userToken = localStorage.getItem(vm.STORAGE_TOKEN) || null;
    var deferredUserProfile = $q.defer();
    var deferredUserToken = $q.defer();

    if (userProfile) {
      deferredUserProfile.resolve(userProfile);
    }

    if (userToken) {
      deferredUserToken.resolve(userToken);
    }

    this.login = function() {
      lock.show();
    };

    // Logging out just requires removing the user's
    // id_token and profile from localStorage
    this.logout = function() {
      deferredUserProfile = $q.defer();
      deferredUserToken = $q.defer();
      localStorage.removeItem(vm.STORAGE_TOKEN);
      localStorage.removeItem(vm.STORAGE_PROFILE);
      authManager.unauthenticate();
      userProfile = null;
      userToken = null;
      $state.go("login");
    };

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    this.registerAuthenticationListener = function() {
      lock.on("authenticated", function(authResult) {
        localStorage.setItem(vm.STORAGE_TOKEN, authResult.idToken);
        deferredUserToken.resolve(authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if(error) {
            return console.log(error);
          }

          localStorage.setItem(vm.STORAGE_PROFILE, JSON.stringify(profile));
          deferredUserProfile.resolve(profile);
          $rootScope.$broadcast('userProfileSet', profile);
          // $state.go("search");
        });

      });
    };

    this.getDeferredUserProfile = function() {
      return deferredUserProfile.promise;
    };

    this.getDeferredUserToken = function() {
      return deferredUserToken.promise;
    };
  }]);
