(function (angular) {
    "use strict";

    angular.module("services.profile", [])
        .service("profileService", function ($http) {

            if (!profiles) profiles = [{
                "teste": "teste"
            }];

            this.findAll = function () {
                return profiles;
            };

            this.findById = function (id) {
                return profiles.find(function (profile) {
                    return profile.id === id;
                });
            };
        });
})(window.angular);

var profiles = [];

function listEntries(obj) {
    //no HTML existe uma tag script que faz um get na planilha e chama uma função de callback (que no caso é essa)
    profiles = [];
    obj.feed.entry.forEach(function (profile) {
        profiles.push({
            id: profile["gsx$id"].$t
            , nome: profile["gsx$nome"].$t
            , bio: profile["gsx$bio"].$t
            , nome_album: profile["gsx$nomealbum"].$t
            , rede_social: profile["gsx$redesocial"].$t
        });
    });

    //variavel global :/ porco mas n soube fazer de outro jeito
}