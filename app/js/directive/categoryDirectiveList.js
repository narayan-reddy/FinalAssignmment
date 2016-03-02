(function(){
	//creating directive for menu list for navigation bar
    angular
        .module('glNewsApp')
        .directive('categoryDirectiveList', function () {
            return {
                restrict: "E",
                transclude: true,
                replace: true,
                scope: {
                    obj: '=',
                    change: '&',
                    index: '@'

                },
                link: function (scope, element, attrs) {
                    //  var container = angular.element(element);


                },
                template: '<a  href=""  ng-click=" menuCtrl();"><i class="fa fa-xing "></i><span>{{obj.category}}</span></a>'};
        });


})();