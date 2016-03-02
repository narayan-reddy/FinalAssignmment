/**
 * Created by narayan.reddy on 19-02-2016.
 */
(function () {
    //creating factory for retrieving all Categorys of sport
    angular
        .module("glNewsApp")
        .factory("Categories", function ($http) {
            var newsCategoriesList = {};
            newsCategoriesList.promise = function (newCategory) {

                return $http.get(newCategory);
            };
            return newsCategoriesList;

        });
})();
