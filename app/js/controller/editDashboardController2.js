/**
 * Created by narayan.reddy on 23-02-2016.
 */
(function () {
    angular.module('glNewsApp').controller('editDashboardController2', ['$scope', '$location', '$http', 'CategoryDetails', 'getCategoryDetails', 'CategoriesSelectedService', 'Categories', '$q', '$timeout', function ($scope, $location, $http, CategoryDetails, getCategoryDetails, CategoriesSelectedService, Categories, $q, $timeout) {


        var ref, usersRef, CategoriesListMain, CategoriesList, selectedItemUrl, CategoryList3, selectedCategoryString, selectedItemArray;

        //code checks for any exist user if no it's redirect to login page
        if (!localStorage.getItem('userName')) {
            $location.path('/');
        }

        //getting reference of firebase database
         ref = new Firebase("https://gl-newsapidata.firebaseio.com/web/saving-data/fireblog");

        //getting child for particular ref
         usersRef = ref.child("users");



         CategoriesListMain = [
            {
                category: "Top news",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=newsmldefault&format=simplejson"
            }
            , {
                category: "india",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=-2128936835&format=simplejson"
            },
            {
                category: "World",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=296589292&format=simplejson"
            },
            {
                category: "Business",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=1898055&format=simplejson"
            },
            {
                category: "Sports",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=4719148&format=simplejson"
            },
            {
                category: "Science",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?format=simplejson&newformat=true&newsid=-2128672765"
            },
            {
                category: "Environment",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=2647163&format=simplejson"
            },
            {
                category: "Tech",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=5880659&format=simplejson"
            },
            {
                category: "Education",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=913168846&format=simplejson"
            },
            {
                category: "Entertainment",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=1081479906&format=simplejson"
            },
            {
                category: "Life & Style",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=2886704&format=simplejson"
            },
            {
                category: "All Movies",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=135762&format=simplejson"
            },
            {
                category: "TV",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=17781976&format=simplejson"
            }, {
                category: "Events",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=2277129&format=simplejson"
            }];


         CategoriesList = [
            {
                category: "Top news",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=newsmldefault&format=simplejson"
            }
            , {
                category: "india",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=-2128936835&format=simplejson"
            },
            {
                category: "World",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=296589292&format=simplejson"
            },
            {
                category: "Business",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=1898055&format=simplejson"
            },
            {
                category: "Sports",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=4719148&format=simplejson"
            },
            {
                category: "Science",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?format=simplejson&newformat=true&newsid=-2128672765"
            },
            {
                category: "Environment",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=2647163&format=simplejson"
            },
            {
                category: "Tech",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=5880659&format=simplejson"
            },
            {
                category: "Education",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=913168846&format=simplejson"
            },
            {
                category: "Entertainment",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=1081479906&format=simplejson"
            },
            {
                category: "Life & Style",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=2886704&format=simplejson"
            },
            {
                category: "All Movies",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=135762&format=simplejson"
            },
            {
                category: "TV",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=17781976&format=simplejson"
            }, {
                category: "Events",
                url: "http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=2277129&format=simplejson"
            }];

         selectedItemUrl = [];
         CategoryList3 = [];
         selectedCategoryString = '';
         selectedItemArray = [];

        //adding class to html at run time
        //$('html').addClass('modelOverflow');

        //performing operation on selected Category News Items
        if ((localStorage.getItem('selectedItems').length > 1)) {

            selectedItemArray = localStorage.getItem('selectedItems').split(',');

            if (selectedItemArray.length > 0) {

                for (var i = 0; i < selectedItemArray.length; i++) {
                    var categoriesList2 = [];
                    categoriesList2.push(selectedItemArray[i]);
                    for (var j = 0; j < CategoriesListMain.length; j++) {
                        if (CategoriesListMain[j].category == selectedItemArray[i]) {
                            categoriesList2.push(CategoriesListMain[j].url);
                            selectedItemUrl.push(CategoriesListMain[j])
                            selectedCategoryString = selectedCategoryString + " " + CategoriesListMain[j].category;
                        }
                    }



                }

                // var selectedCategoryStringArray=selectedCategoryString.split(',');
                for (var j = 0; j < CategoriesListMain.length; j++) {
                    if (selectedCategoryString.search(CategoriesListMain[j].category) < 0) {
                        CategoryList3.push(CategoriesListMain[j]);
                    }
                }
                $scope.CategoryNames = selectedItemArray;
                $scope.getList = function (index) {
                    $scope.items2 = [];
                    getCategoryDetails.promise(selectedItemUrl[index]).then(function (response) {
                        $scope.items2 = response.data.NewsItem;
                    });
                };

            }
        }
        else {
            CategoryList3 = CategoriesListMain;
            selectedItemUrl = [];
        }


        $scope.models = {
            selected: null,
            lists: {"Categories": CategoryList3, "SelectedCategories": selectedItemUrl}
        };

        /**
         * @name getLists
         * @desc getting all selected Categories News Item List
         * @param
         * @returns []
         */
        $scope.getLists = function () {
            //CategoriesSelectedService.addCategories($scope.droppedObjects1);
            var userName = localStorage.getItem("userName");
            var selectedCategories = '';
            for (var i = 0; i < $scope.models.lists.SelectedCategories.length; i++) {
                if (0 == i) {
                    selectedCategories = $scope.models.lists.SelectedCategories[i].category;
                }
                else {
                    selectedCategories = selectedCategories + ',' + $scope.models.lists.SelectedCategories[i].category;
                }

            }

            // localStorage.setItem(userName + '-selectedItem', selectedCategories);
            usersRef.child(userName).update({
                selectedItems: selectedCategories

            });

            localStorage.setItem('selectedItems', selectedCategories);

            document.location.reload(true);

        };


    }]);
})();

