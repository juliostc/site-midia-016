(function (angular) {
	"use strict";
	var router = angular.module("configs.router", []);
	router.config(function ($locationProvider, $routeProvider) {
		$routeProvider.when("/perfis/:id", {
			templateUrl: "profiles/index.html"
			, controller: "ProfilesShowController"
			, controllerAs: "ctrl"
			, reloadOnSearch: false
		}).when("/perfis", {
			templateUrl: "profiles/index.html"
			, controller: "ProfilesIndexController"
			, controllerAs: "ctrl"
		}).when("/sobre", {
			templateUrl: "about.html"
		}).otherwise({
			redirectTo: "/perfis"
		});
	});
	// resets the title and subtitle when the route changes
	router.run(function ($rootScope, PageSettings) {
		$rootScope.$on("$routeChangeSuccess", function () {
			PageSettings.setTitle("Midiafy");
			PageSettings.setSubtitle(null);
		});
	});
})(window.angular);