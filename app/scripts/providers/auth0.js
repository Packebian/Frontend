"use strict";

/**
 * @ngdoc service
 * @name Packebian.auth0Provider
 * @description
 * # Environment
 * Provider in the Packebian app.
 */
packebianApp
  .provider("auth0", [
  function () {
    var vm = this;

    this.STORAGE_USERINFOS = "userinfos";

    this.$get = function() {
      return {
        STORAGE_USERINFOS: vm.STORAGE_USERINFOS
      };
    };

    this.tokenGetter = function (options) {
      if (options && options.url.substr(options.url.length - 5) === ".html") {
        return null;
      }
      var infos = JSON.parse(localStorage.getItem(vm.STORAGE_USERINFOS));
      if(!infos) { return null; }
      return infos.token;
    };

  }]);
