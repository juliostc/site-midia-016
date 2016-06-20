(function(angular) {
  "use strict";

  angular.module("controllers.profiles.index", [
    "services.profile"
  ])
    .controller("ProfilesIndexController", function(
      PageSettings,
      profileService
    ) {
      PageSettings.setSubtitle("Perfis");

      this.profiles = profileService.findAll();
    });
})(window.angular);
