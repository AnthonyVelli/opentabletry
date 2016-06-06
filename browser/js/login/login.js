'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = (loginInfo => {

        $scope.error = null;

        AuthService.login(loginInfo)
        .then(() => AuthService.getLoggedInUser())
        .then(user => $state.go(user.type))
        .catch(err => {
            console.log(err);
            $scope.error = err; });
        
    });


});