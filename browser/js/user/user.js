'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user/:id',
        templateUrl: 'js/user/user.html',
        controller: 'user',
        resolve: {
        	foundUser: (UserFact, $stateParams) => {
        		return UserFact.getOne($stateParams.id)
        		.then(foundUser => foundUser)
        		.catch(err => console.error(err));
        	}
    	}
    });
})
.controller('user', (foundUser, $scope) => {
    console.log(foundUser);
});