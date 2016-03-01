    /**
 * Created by narayan.reddy on 21-02-2016.
 */
angular.module('glNewsApp').service('CategoriesSelectedService',function(){
    var categorytList = [];

    var addCategories = function(newObj) {
        categorytList.push(newObj);
    };

    var getCategories = function(){
        return categorytList;
    };

    return {
        addCategories: addCategories,
        getCategories: getCategories
    };
});
