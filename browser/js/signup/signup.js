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
        $scope.signup.restaurants.seating = $scope.seating;
        $scope.error = null;
        UserFact.createOne($scope.signup)
        .then(usr => {
            $state.go('partner', {id: usr.restaurants[0]}); });
    };

});