"use strict";

/**
 * @ngdoc service
 * @name Packebian.auth0Service
 * @description
 * # Environment
 * Service in the Packebian app.
 */
packebianApp
  .service("auth0Service", ["lock", "authManager", "$state", "$q", "auth0",
  function auth0Service(lock, authManager, $state, $q, auth0) {

    var userInfos = JSON.parse(localStorage.getItem(auth0.STORAGE_USERINFOS)) || null;
    var deferredUserInfos = $q.defer();
    var deferredLogout = $q.defer();

    if (userInfos !== null) {
      deferredUserInfos.resolve(userInfos);
    }

    this.login = function() {
      lock.show();
    };

    // Logging out just requires removing the user's
    // id_token and profile from localStorage
    this.logout = function() {
      localStorage.removeItem(auth0.STORAGE_USERINFOS);
      authManager.unauthenticate();
      userInfos = null;
      deferredLogout.resolve();
    };

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    this.registerAuthenticationListener = function() {
      lock.on("authenticated", function(authResult) {
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if(error) {
            return console.log(error);
          }
          userInfos = {"token": authResult.idToken, "user": profile};
          localStorage.setItem(auth0.STORAGE_USERINFOS, JSON.stringify(userInfos));
          deferredUserInfos.resolve(userInfos);

          $state.go('login', null, {reload: true});
        });

      });
    };

    this.getDeferredUserInfos = function() {
      return deferredUserInfos.promise;
    };

    this.getDeferredLogout = function() {
      return deferredLogout.promise;
    };
  }]);
