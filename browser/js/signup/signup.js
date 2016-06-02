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
.controller('SignupCtrl', ($scope, UserFact, $state) => {
    $scope.signup = {};
    $scope.seating = {};
    $scope.error = null;

    $scope.sendSignup = function () {
        $scope.error = null;
        $scope.signup.type = 'User';
        UserFact.createOne($scope.signup)
        .then(usr => {
            $state.go('home', {id: usr._id}); });
    };

    $scope.sendPartnerSignup = function () {
        $scope.error = null;
        $scope.signup.type = 'Partner';
        $scope.signup.restaurants.seating = $scope.seating;
        UserFact.createOne($scope.signup)
        .then(usr => {
            $state.go('partner', {id: usr.restaurants[0]}); });
    };

});