//creating diretive for showing category Details.
    angular
        .module('glNewsApp')
        .directive('categoryDetailsDirective', function () {
            return {
                restrict: 'E',
                transclution: true,
                replace: true,
                scope: {
                    obj: '=',
                    change: '&',
                    index: '@'
                },
                link: function (scope, element, attrs) {
                    //writing function for readMore functionality



                    scope.lessMoreclass = "less";
                    scope.readMoreText = "Read more...";
                    scope.byDefaultImage = "../images/No_Image_Available.png";
                    scope.showView = 0;

                    if (!scope.obj.Photo) {
                        scope.Image = "http://arakarabia.com/images/noimage.png";
                    }
                    else {
                        scope.Image = scope.obj.Photo;
                    }

                    scope.changeClass = function (eve) {

                        if (scope.lessMoreclass === "less") {
                            scope.lessMoreclass = "more";

                            scope.readMoreText = " less...";
                        }
                        else {
                            scope.lessMoreclass = "less";
                            scope.readMoreText = "Read more...";
                        }

                    };


                },


                template: '<div class="white-panel pn donut-chart ds">' +
                '<div class="white-header"><h3>{{obj.HeadLine}}</h3></div>' +
                '<div class=""><div class="dateNTime col-md-10">{{obj.DateLine}}</div>' +
                '<div class="hidden"><p>{{obj.KeyWords}}</p></div><div class="clear"></div>' +
                '<div class="big-image"><img class="img-responsive" src="{{Image}}"></div>' +
                '<div class="col-md-12 caption">{{obj.Caption}}</div>' +
                '<div class=" moreData col-md-12" ng-class="lessMoreclass">{{obj.Story}}</div></div></div>'
            };
        });
