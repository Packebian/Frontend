"use strict";

/**
 * @ngdoc service
 * @name Packebian.auth0Service
 * @description
 * # Environment
 * Service in the Packebian app.
 */
packebianApp
  .service("auth0Service", ["$rootScope", "lock", "authManager", '$state', "$q",
  function auth0Service($rootScope, lock, authManager, $state, $q) {

    var userProfile = JSON.parse(localStorage.getItem("profile")) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    this.login = function() {
      lock.show();
    };

    // Logging out just requires removing the user's
    // id_token and profile from localStorage
    this.logout = function() {
      deferredProfile = $q.defer();
      localStorage.removeItem("id_token");
      localStorage.removeItem("profile");
      authManager.unauthenticate();
      userProfile = null;
      // $location.path("/login");
      // $state.go('login');
    };

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    this.registerAuthenticationListener = function() {
      lock.on("authenticated", function (authResult) {
        console.log("Logging");
        localStorage.setItem("id_token", authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }

          localStorage.setItem("profile", JSON.stringify(profile));
          deferredProfile.resolve(profile);
          // $state.go('search');
          // $rootScope.$broadcast('userProfileSet', profile);

        });

      });
    };

    this.getProfileDeferred = function() {
      return deferredProfile.promise;
    };
    //
    // this.isAuthenticated = function() {
    //   return authManager.isAuthenticated;
    // }

  }]);
