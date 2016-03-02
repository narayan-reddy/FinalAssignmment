/**
 * Created by narayan.reddy on 23-02-2016.
 */
(function () {
    'use strict';
    angular.module('glNewsApp').controller('loginController', ['$scope', '$location', function ($scope, $location) {

        var ref,usersRef,usersData,userUpdate;

        //getting reference of firebase database
         ref = new Firebase("https://gl-newsapidata.firebaseio.com/web/saving-data/fireblog");

        //getting child for particular ref
         usersRef = ref.child("users");

        //declaring variable for user data
         usersData = [];

        //getting snapshot of data in firebase
         userUpdate = usersRef.on('value', function (snapshot) {
            usersData = snapshot.val();
        });

        $('html').removeClass('modelOverflow');

        //applying style to logoutButton at run time.
        $scope.logoutButton={
            "display": "none"
        };

        /**
         * @name signUp
         * @desc perform signup operation
         * @param
         * @returns
         */
        $scope.signUp = function () {

            var userName = $scope.Signup_userName;
            var userPassword = $scope.Signup_userPassword;
            var rePassword=$scope.Signup_userCPassword;
            var userEmailID=$scope.Signup_userEmailID;
            var selectedItems = '';

            if(usersData[userName]){
                $scope.errorBox='user is already register please do log in!!!';
                $scope.Signup_userName='';
                $scope.Signup_userPassword='';
            }
            else{
                usersRef.child(userName).set({
                    userPassword: userPassword,
                    userEmailID:userEmailID,
                    selectedItems: ""

                });
                localStorage.setItem('userName', $scope.userName)
                //localStorage.setItem($scope.userName + '-password', $scope.userPassword);
                $scope.Signup_userName = $scope.Signup_userPassword =$scope.Signup_userCPassword=$scope.Signup_userEmailID= '';

                $location.path('/dashboard');
            }




        };

        /**
         * @name signUpValidation
         * @desc perform signup operation
         * @param
         * @returns
         */
        $scope.signUpValidation=function()
        {
            var userName = $scope.Signup_userName;
            var userPassword = $scope.Signup_userPassword;
            var rePassword=$scope.Signup_userCPassword;
            var userEmailID=$scope.Signup_userEmailID;
            if(userName.length>0 && userPassword.length>0 && rePassword.length>0 && userEmailID.length>0){
                if(usersData[userName]!=undefined){
                    $scope.errorBox='user is already register please do log in!!!';
                    $scope.Signup_userName='';
                    $scope.Signup_userPassword='';
                    $scope.Signup_userCPassword='';
                    $scope.Signup_userEmailID='';

                }
                else{
                    usersRef.child(userName).set({
                        userPassword: userPassword,
                        userEmailID:userEmailID,
                        selectedItems: ""

                    });
                    localStorage.setItem('userName', $scope.Signup_userName)
                    localStorage.setItem('selectedItems','');
                    $scope.Signup_userName = $scope.Signup_userPassword =$scope.Signup_userCPassword=$scope.Signup_userEmailID= '';

                    $location.path('/dashboard');
                }
            }
            else
            {
                $location.path('/login');
            }

        }

        /**
         * @name logIn
         * @desc performing login operation
         * @param
         * @returns
         */
        $scope.logIn = function () {

            var userName = $scope.Login_userName;
            var userPassword = $scope.Login_userPassword;

            if (usersData[userName]) {
                if (usersData[userName]['userPassword'] == userPassword) {
                    localStorage.setItem('userName', userName)
                    localStorage.setItem('selectedItems',usersData[userName]['selectedItems']);

                    $location.path('/dashboard');
                    $scope.userName='';
                    $scope.userPassword='';
                }
                else {
                    $scope.errorBox='please provide correct userName and password !!!';
                    $scope.userName='';
                    $scope.userPassword='';
                }
            }else {
                $scope.errorBox='please provide correct userName and password !!!';
                $scope.userName='';
                $scope.userPassword='';
            }



        };
    }]);
})();

