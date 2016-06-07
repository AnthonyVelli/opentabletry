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
.controller('SignupCtrl', ($scope, UserFact, AuthService, $rootScope, $state) => {
    $scope.signup = {};
    $scope.restaurant = {};
    $scope.restaurant.seating = [{size: 0, quantity: 0}];      
    $scope.error = null;

    $scope.submitcall = rest => {
        $scope.error = null;
        $scope.signup.type = 'partner';
        $scope.signup.restaurants = rest;
        UserFact.createOne($scope.signup)
        .then(user => $state.go('login'))
        .catch(err => console.error(err));
    };

});