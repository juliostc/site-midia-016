(function(angular) {
  "use strict";

  angular.module("controllers.main", [])
    .controller("MainController", function(
      PageSettings
    ) {
      this.getFullTitle = function() {
        if (PageSettings.getSubtitle()) {
          return PageSettings.getSubtitle() + " | " + PageSettings.getTitle();
        } else {
          return PageSettings.getTitle();
        }
      };
    });
})(window.angular);
