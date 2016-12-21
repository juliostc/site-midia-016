(function(angular) {
  "use strict";

  angular.module("midiafy", [
    "ngRoute",
    "controllers.main",
    "controllers.profiles.index",
    "controllers.profiles.show",
    "configs.pageSettings",
    "configs.router"
  ]);
})(window.angular);
