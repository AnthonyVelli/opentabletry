'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('partner', {
        url: '/partner/:id',
        templateUrl: './js/partner/partner.html',
        controller: 'partner',
        resolve: {
            restaurant: (RestaurantFact, $stateParams) => {
                return RestaurantFact.getOne($stateParams.id);
            }
        }
    });
})
.controller('partner', (($scope, PartnerFact, RestaurantFact, $rootScope, restaurant) => {
    _.merge($scope, PartnerFact.populateCalendar(restaurant));
    $scope.data = {};
    $scope.data.selected = false;
    $scope.config.onTimeRangeSelect = (e => {
        console.log(e);
        $scope.data.selected = true;
        $scope.event.start = new Date(e.start.value);
        $scope.event.end = new Date(e.end.value);
        $scope.event.resource = e.resource;
        $scope.$apply();
    });
    $scope.event = {};
    $scope.sendEvent = (event => {
        restaurant.reservations ? restaurant.reservations.push(event) : restaurant.reservations = [event];
        RestaurantFact.update(restaurant)
        .then(updatedRes => {
            $scope.events.push(updatedRes);
            $scope.$apply();
        });
    });
    

    
})); 