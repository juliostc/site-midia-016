(function (angular) {
    "use strict";

    angular.module("controllers.profiles.show", [
    "services.profile"
  ])
        .controller("ProfilesShowController", function (
            $routeParams,
            PageSettings,
            profileService
        ) {
            this.profile = profileService.findById($routeParams.id);

            PageSettings.setSubtitle(this.profile.name);

            this.getImagePath = function (profileId) {
                return "assets/profiles/" + profileId + ".jpg";
            };
        });
})(window.angular);
