(function (angular) {
	"use strict";
	angular.module("services.profile", []).service("profileService", function ($http, $rootScope) {
		this.findAll = function (success) {
			$http.get('assets/data.json').then(success, function (response) {
				console.info("ERRO AO PEGAR OS DADOS");
				console.log(response);
			});
		};
		this.findById = function (profiles, id) {
			console.log("aqui vai o profiles dentro do findById");
			console.log(profiles);
			return profiles.find(function (profile) {
				return profile.id === id;
			});
		};
		this.previousAndNext = function (profiles, profile) {
			var index = profiles.indexOf(profile);
			var result = [];
			if (index > 0) {
				result[0] = profiles[index - 1];
			}
			if (index < profiles.length) {
				result[1] = profiles[index + 1];
			}
			return result;
		};
		this.getProfileUrl = function (id) {
			return "#!/perfis/?{{" + id + "}}";
		};
		this.getRandomProfile = function (profiles, exceptions) {
			var aux = profiles.slice(0);
			for (var i = 0; i < exceptions.length; i++) {
				aux.splice(aux.indexOf(exceptions[i]), 1);
			}
			var index = Math.max(Math.min(Math.ceil(Math.random() * aux.length), aux.length - 1), 0);
			return aux[index];
		};
	});
})(window.angular);