/**
 * Created by narayan.reddy on 20-02-2016.
 */
(function () {
    angular.module('glNewsApp').controller('dashboardController', ['$scope', '$location', '$http', 'CategoryDetails', 'getCategoryDetails', 'CategoriesSelectedService', 'Categories', '$q', '$timeout', '$interval','$uibModal', function ($scope, $location, $http, CategoryDetails, getCategoryDetails, CategoriesSelectedService, Categories, $q, $timeout, $interval,$uibModal) {

        var ref,usersRef,usersData,userUpdate,userName,selectedItems,selectedItemUrl,favList,favListArray, favListArrayURL,favListArrayURLRequest,favListScroller;

        //code checks for any exist user if no it's redirect to login page
        if (!localStorage.getItem('userName')) {
            $location.path('/');
        }

        //applying style at run time to first time login
        $scope.firstTime = {'display': 'none'};

        //getting reference of firebase database
         ref = new Firebase("https://gl-newsapidata.firebaseio.com/web/saving-data/fireblog/posts");

        //getting child for particular ref
         usersRef = ref.child("users");

        //declaring variable for user data
         usersData;

        //getting snapshot of data in firebase
         userUpdate = usersRef.on('value', function (snapshot) {
            usersData = snapshot.val();
        });

        //applying style at run time to loading data
        $scope.loadingData = {'display': 'block'};

        //getting userName from localStorage
         userName = localStorage.getItem('userName');

        //setting userName to scope variable
        $scope.userName = userName;

        $('html').removeClass('modelOverflow');
         selectedItems = '';

        //getting selected category list from localStorage
        selectedItems = localStorage.getItem('selectedItems');

        //all news category links
        var CategoriesList = [
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

       // var userNAme = localStorage.getItem("userName");

         selectedItemUrl = [];


        //getting data of breaking news
        getCategoryDetails.promise(CategoriesList[0].url).then(function (response) {
            $scope.breakingNewsTitle = CategoriesList[0].category;
            $scope.breakingNewsItems = response.data.NewsItem;
        });

        //In every 60 seconds checks for update data
        $interval(function () {
            getCategoryDetails.promise(CategoriesList[0].url).then(function (response) {
                $scope.breakingNewsTitle = CategoriesList[0].category;
                $scope.breakingNewsItems = response.data.NewsItem;
            });
        }, 60000);


        //checks for selected news category
        if (!(selectedItems == '')) {
            var selectedItemArray = selectedItems.split(',');
            if (selectedItemArray.length > 0) {
                var urList = [];
                for (var i = 0; i < selectedItemArray.length; i++) {
                    for (var j = 0; j < CategoriesList.length; j++) {
                        if (CategoriesList[j].category == selectedItemArray[i]) {
                            selectedItemUrl.push(CategoriesList[j].url)
                            urList.push(getCategoryDetails.promise(CategoriesList[j].url))
                        }
                    }
                }

                //applying promise all for fetching number of data at a time or together
                var all = $q.all(urList);
                all.then(success);
                var newItems = [];//getting one category details in array
                var newItemsList=[];//getting all category details in one single array for scrolling ..

                //checking for any update in news category detail changes in very 5 minutes
                $interval(function () {
                    var all = $q.all(urList);
                    all.then(success);
                    newItems = [];
                    newItemsList=[];
                }, 300000);


                function success(data) {
                    for (var i = 0; i < data.length; i++) {
                        newItems.push({category: selectedItemArray[i], NewsItem: data[i].data.NewsItem});
                        if(data[i].data.NewsItem.length>0){
                            for(var newsItemListNumber=0;newsItemListNumber<data[i].data.NewsItem.length;newsItemListNumber++){
                                newItemsList.push(data[i].data.NewsItem[newsItemListNumber]);
                            }
                        }
                        else{
                            data[i].data.NewsItem[newsItemListNumber]=[{HeadLine: "News id does not exists ",DateLine: "News id does not exists ",KeyWords:"News id does not exists ",Caption:"News id does not exists ",Story:"News id does not exists "}];
                            newItemsList.push(data[i].data.NewsItem[newsItemListNumber]);
                        }

                        $scope.loadingData = {'display': 'none'};
                    }
                    $scope.selectedCategoriesNewsDetails = newItems;
                    $scope.seletedItemsScroll=newItemsList;

                }


                $scope.selectedCategoriesNewsDetails = newItems;
                $scope.seletedItemsScroll=newItemsList;

            }
            else {
                $scope.categoryList = CategoriesList;
                getCategoryDetails.promise(CategoriesList[0].url).then(function (response) {
                    $scope.categoryName = CategoriesList[0].category;
                    $scope.items = response.data.NewsItem;
                });

            }
        }
        else {
            $scope.firstTime = {'display': 'block'};
            $scope.loadingData={'display':'none'};

            //$(document).ready(function () {
            //    $('#firstUserModel').foundation('reveal', 'open')
            //});

        }


        //declaring variable for selected favourite list
         favList = [];
        favListArrayURL=[];
        $scope.favouriteSelection=function(selectedCategory,newsItems){


            if ($('#'+selectedCategory).is(':checked') ) {
                favList.push(selectedCategory);
                for(var i=0;i<newsItems.length;i++){
                    favListArrayURL.push(newsItems[i]);
                }
                console.log(favList);
                console.log(favListArrayURL);
                $scope.seletedItemsScroll=favListArrayURL;
            } else {
                favList.splice(favList.indexOf(selectedCategory),1);
                for(var i=0;i<newsItems.length;i++)
                {
                    favListArrayURL.splice(favListArrayURL.indexOf(newsItems[i]),1);
                }

                console.log(favList);
                console.log(favListArrayURL);
                $scope.seletedItemsScroll=favListArrayURL;
            }

        };

         favListArray=[];
         favListArrayURL=[];
         favListArrayURLRequeset=[];

        /**
         * @name favListScroller
         * @desc fetching favourite categoires details
         * @param [] object
         * @returns [] object
         */
        // favListScroller=function(favList){
        //    favListArray=[];
        //    for(var i=0;i<favList.length;i++){
        //        favListArray.push(favList[i][0]);
        //        favListArrayURL.push(CategoriesList[favList[i][0]].url)
        //
        //    }
        //    for(var i=0;i<favListArrayURL.length;i++){
        //        favListArrayURLRequset.push(getCategoryDetails.promise(favListArrayURL[i].url))
        //    }
        //
        //
        //}

        /**
         * @name loginForm
         * @desc clear localstorage data and redirect to login page
         * @param
         * @returns
         */
        $scope.loginForm = function () {
            localStorage.clear()
            $location.path('/login');
        };

        $('html').removeClass('modelOverflow');


        /**
         * @name closeModal
         * @desc applying css to html
         * @param
         * @returns
         */
        $scope.closeModal=function()
        {
            $('html').removeClass('modelOverflow');
        }

        /**
         * @name showOverlay
         * @desc apply style to category link for showing pop up
         * @param {object} categoryLink2 value to showOverlay
         * @returns {void}
         */
        $scope.showOverlay = function (categoryLink2) {
            $scope.categoryLink = categoryLink2;
            $('html').addClass('modelOverflow');



            if (!$scope.categoryLink.Photo) {
                $scope.Image = "http://arakarabia.com/images/noimage.png";
            }
            else {
                $scope.Image = $scope.categoryLink.Photo;
            }


        };
    }
    ])
    ;
})();
