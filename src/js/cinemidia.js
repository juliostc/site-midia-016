(function(angular) {
  "use strict";

  angular.module("cinemidia", [
    "ngRoute",
    "controllers.main",
    "controllers.profiles.index",
    "controllers.profiles.show",
    "configs.pageSettings",
    "configs.router"
  ]);
})(window.angular);
