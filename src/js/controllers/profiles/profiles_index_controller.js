(function (angular) {
    "use strict";

    angular.module("controllers.profiles.index", [
    "services.profile"
  ])
        .controller("ProfilesIndexController", function (
            PageSettings, profileService, $routeParams, $location, $scope, $sce, $window
        ) {
            PageSettings.setSubtitle("Perfis");
            this.profiles = profileService.findAll();

            $scope.getProfileUrl = function (id) {

                return profileService.getProfileUrl(id);
            };


            this.tracks = [
                {
                    title: "Projeto de Pesquisa",
                    url: "PROJETO_DE_PESQUISA",
                    index: 0
                },
                {
                    title: "Artigo Científico",
                    url: "ARTIGO",
                    index: 1
                },
                {
                    title: "Projeto de Desenvolvimento",
                    url: "PROJETO_DE_DESENVOLVIMENTO",
                    index: 2
                },
                {
                    title: "Produto Midiático",
                    url: "PRODUTO_MIDIATICO",
                    index: 3,
                    exception: true
                },
                {
                    title: "Relatório do Produto",
                    url: "RELATORIO",
                    index: 4
                }
            ];

            this.currentID = Object.keys($routeParams)[0];
            $scope.selectedProfile = profileService.findById(this.currentID);
            this.isActive = function () {
                return !!($scope.selectedProfile);
            };
            if ($scope.selectedProfile) {
                $scope.iframeUrl = $sce.trustAsResourceUrl($scope.selectedProfile.link_produto);
                console.log($scope.iframeUrl + " - " + $scope.selectedProfile.link_produto);
                console.log($scope.selectedProfile);
            }
            $scope.previousAndNext = profileService.previousAndNext($scope.selectedProfile);
            console.log($scope.previousAndNext);
            $scope.showMedia = function () {
                var perfil = $scope.selectedProfile;
                if (perfil.tipo_produto == 'EMBED') {
                    perfil.tab = 'media';
                } else if (perfil.tipo_produto == 'LINK') {
                    $window.open(perfil.link_produto, '_blank');
                }

            };
            $scope.hideMedia = function () {
                $scope.selectedProfile.tab = 'main';

            };





        });
})(window.angular);
