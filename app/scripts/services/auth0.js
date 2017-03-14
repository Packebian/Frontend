"use strict";

/**
 * @ngdoc service
 * @name Packebian.auth0Service
 * @description
 * # Environment
 * Service in the Packebian app.
 */
packebianApp
  .service("auth0Service", ["Environment", "lock", "authManager", "$state", "$q", "$http", "auth0",
  function auth0Service(Environment, lock, authManager, $state, $q, $http, auth0) {

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
      $state.go("home");
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

          /* Retrieve real JWT from packebian API */
          var reqUrl = Environment.getApiAddress("/login") + "?type=auth0";
          var reqData = JSON.stringify ({"token": authResult.idToken});
          var reqOptions = JSON.stringify ({"Content-Type": "application/json"});

          $http.post(reqUrl, reqData, reqOptions)
            .then(function(response) {
              userInfos = {"token": response.data.token, "auth0Token": authResult.idToken, "user": profile};
              localStorage.setItem(auth0.STORAGE_USERINFOS, JSON.stringify(userInfos));
              deferredUserInfos.resolve(userInfos);

              $http.defaults.headers.common.Authorization = "Bearer " + response.data.token;

              $state.go("search");
            }, function(response) {
              console.log("error - ", response);
            });

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
