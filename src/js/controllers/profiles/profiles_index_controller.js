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
        
            this.tracks = [
                {title: "Projeto de Pesquisa", url: "PROJETO_DE_PESQUISA", index: 0},
                {title: "Artigo Científico", url: "ARTIGO_CIENTIFICO", index: 1},
                {title: "Projeto de Desenvolvimento", url: "ARTIGO_CIENTIFICO", index: 2},
                {title: "Produto Midiático", url: "PRODUTO_MIDIATICO", index: 3, exception: true},
                {title: "Relatório do Produto", url: "RELATORIO", index: 4}
            ];

            this.currentID = Object.keys($routeParams)[0];
            $scope.selectedProfile = profileService.findById(this.currentID);
            this.isActive = function () {
                return !!($scope.selectedProfile);
            };


        });
})(window.angular);