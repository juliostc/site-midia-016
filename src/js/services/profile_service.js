(function(angular) {
  "use strict";

  angular.module("services.profile", [])
    .service("profileService", function() {
      var profiles = [
        {
          id: "lorde",
          name: "Lorde",
          description: "bem #top"
        },
        {
          id: "taylor",
          name: "Taylor Swift",
          description: "nem tão #top mas já pegou o Gyllenhaal eu acho"
        }
      ];

      this.findAll = function() {
        return profiles;
      };

      this.findById = function(id) {
        return profiles.find(function(profile) {
          return profile.id === id;
        });
      };
    });
})(window.angular);
