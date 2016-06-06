'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'home'
     //    resolve: {
     //    	yelpData: (RestaurantFact => {
     //    		return RestaurantFact.getYelp()
     //    		.then(foundRests => foundRests)
     //    		.catch(err => console.error(err));
     //    	})
    	// }
    });
})
.controller('home', ( $scope, RestaurantFact) => {
    // console.log(yelpData);
    // $scope.restaurants = yelpData.businesses.filter(biz => biz.is_claimed);
});