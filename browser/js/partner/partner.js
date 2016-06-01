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
    console.log(restaurant);
    _.merge($scope, PartnerFact.populateCalendar(restaurant));
    $scope.selected = false;
    $scope.config.onTimeRangeSelect = (e => {
        $scope.event = {
            start: new DayPilot.Date(e.start.value),
            end: new DayPilot.Date(e.end.value),
            id: DayPilot.guid(),
            resource: e.resource,
        };
        $scope.events.push($scope.event);
        $scope.selected = true;
        $scope.$apply();
    });
    $scope.sendEvent = (event => {
        restaurant.reservations = $scope.dp.events.list;
        RestaurantFact.update(restaurant)
        .then(updatedRes => $scope.selected = false)
        .catch(err => console.error(err));
    });
    
    
})); 