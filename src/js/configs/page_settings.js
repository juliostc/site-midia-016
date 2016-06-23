(function (angular) {
    "use strict";

    angular.module("configs.pageSettings", [])
        .factory("PageSettings", function () {
            var title = "Midiafy"
                , subtitle = null;

            return {
                getTitle: function () {
                    return title;
                }
                , setTitle: function (newTitle) {
                    title = newTitle;
                }
                , getSubtitle: function () {
                    return subtitle;
                }
                , setSubtitle: function (newSubtitle) {
                    subtitle = newSubtitle;
                }
            };
        });
})(window.angular);