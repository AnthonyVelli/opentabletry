'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'home',
        resolve: {
        	yelpData: (RestaurantFact => {
        		return RestaurantFact.getYelp()
        		.then(foundRests => foundRests)
        		.catch(err => console.error(err));
        	})
    	}
    });
})
.controller('home', (yelpData, $scope, RestaurantFact) => {
    $scope.restaurants = yelpData.businesses;
    // for (var key in restaurants){
    //     console.log(key);
    //     console.log(restaurants[key]);
    // }

});