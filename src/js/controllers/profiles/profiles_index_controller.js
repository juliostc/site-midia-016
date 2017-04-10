(function (angular) {
	"use strict";
	angular.module("controllers.profiles.index", [
    "services.profile"
  ]).controller("ProfilesIndexController", function (PageSettings, profileService, $routeParams, $location, $scope, $sce, $window, $rootScope) {
		PageSettings.setSubtitle("Perfis");
		this.profiles = {};
		profileService.findAll(function (response) {
			$scope.profiles = response.data;
			//$scope.$apply();
			$scope.$watch(function () {
				return $routeParams;
			}, function (routeParams) {
				$scope.currentID = Object.keys(routeParams)[0];
				$scope.selectedProfile = profileService.findById($scope.profiles, $scope.currentID);
				if ($scope.selectedProfile) {
					$scope.firstClick = true;
					$scope.iframeUrl = $sce.trustAsResourceUrl($scope.selectedProfile.link_produto);
				}
				$scope.previousAndNext = profileService.previousAndNext($scope.profiles, $scope.selectedProfile);
			});
		});
		$scope.getProfileUrl = function (id) {
			return profileService.getProfileUrl(id);
		};
		$scope.paddingFix = function (index) {
			if ((index + 1) % 6 == 0) {
				return "right";
			}
			if ((index) % 6 == 0) {
				return "left";
			}
			return "";
		};
		this.tracks = [
			{
				title: "Projeto de Pesquisa"
				, url: "PROJETO_DE_PESQUISA"
				, index: 0
                }
			, {
				title: "Artigo Científico"
				, url: "ARTIGO"
				, index: 1
                }
			, {
				title: "Projeto de Desenvolvimento"
				, url: "PROJETO_DE_DESENVOLVIMENTO"
				, index: 2
                }
			, {
				title: "Produto Midiático"
				, url: "PRODUTO_MIDIATICO"
				, index: 3
				, exception: true
                }
			, {
				title: "Relatório do Produto"
				, url: "RELATORIO"
				, index: 4
                }
            ];
		//$scope.selectedProfile = undefined;
		this.isActive = function () {
			return !!($scope.selectedProfile);
		};
		this.firstClick = function () {
			return !!($scope.firstClick);
		}
		$scope.hideMedia = function () {
			$scope.selectedProfile.tab = 'main';
		};
		$scope.showMedia = function () {
			var perfil = $scope.selectedProfile;
			if (perfil.tipo_produto == 'NAO') {
				return;
			}
			if (perfil.tipo_produto == 'EMBED') {
				perfil.tab = 'media';
			}
			else if (perfil.tipo_produto == 'LINK') {
				$window.open(perfil.link_produto, '_blank');
			}
		};
	}).component('puff', {
		templateUrl: 'components/puff.html'
		, bindings: {
			covers: '<'
			, title: '@'
			, text: "@"
		}
		, controller: function (profileService, $scope) {
			var exceptions = [];
			$scope.covers = [];
			profileService.findAll(function (response) {
				var profiles = response.data;
				for (var i = 0; i < 3; i++) {
					var profile = profileService.getRandomProfile(profiles, exceptions);
					$scope.covers[i] = "assets/profiles/" + profile.id + "/CAPA.jpg";
					exceptions.push(profile);
				}
			});
		}
	});
})(window.angular);