(function(){
	//creating factory for retrieving data of each sport category using url
    angular
        .module("glNewsApp")
        .factory("getCategoryDetails", function ($http) {
            var categoryDetail = {};
            categoryDetail.promise = function (categoryUrl) {
                return $http.get(categoryUrl);
            };
            return categoryDetail;
        });
})();