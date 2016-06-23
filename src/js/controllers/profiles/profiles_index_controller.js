(function (angular) {
    "use strict";

    angular.module("controllers.profiles.index", [
    "services.profile"
  ])
        .controller("ProfilesIndexController", function (
            PageSettings
            , profileService, $routeParams, $location, $scope
        ) {
            PageSettings.setSubtitle("Perfis");
            this.profiles = profileService.findAll();

            this.currentID = Object.keys($routeParams)[0];
            this.currentProfile = profileService.findById(this.currentID);
            this.isActive = function () {
                return !!(this.currentProfile);
            };


        });
})(window.angular);