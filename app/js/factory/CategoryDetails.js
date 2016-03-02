(function () {
    //creating factory for retrieving all Categorys of sport
    angular
        .module("glNewsApp")
        .factory("CategoryDetails", function ($http) {
            var sportsData = {};
            sportsData.promise = function (newType) {
                var getCategorys = 'http://mfeeds.timesofindia.indiatimes.com/Feeds/urlList?category=' + newType;
                return $http.get(getCategorys);
            };
            return sportsData;

        });
})();