'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });
    $stateProvider.state('signup-partner', {
        url: '/signup-partner',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });


})
.controller('SignupCtrl', ($scope, UserFact, $rootScope, $state) => {
    $scope.signup = {};
    $scope.seating = {};
    $scope.error = null;

    $scope.sendSignup = function () {
        $scope.error = null;
        $scope.signup.type = 'user';
        UserFact.createOne($scope.signup)
        .then(usr => {
            $state.go('home', {id: usr._id}); });
    };

    $scope.sendSignup = function () {
        $scope.error = null;
        if ($rootScope.url === "/signup-partner") {
            $scope.signup.type = 'partner';
            $scope.signup.restaurants.seating = $scope.seating;
        } else {
            $scope.signup.type = 'user';
        }
        UserFact.createOne($scope.signup)
        .then(usr => {
            $state.go($scope.signup.type, {id: usr._id}); });
    };

});