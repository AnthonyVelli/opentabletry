'use strict';
app.config($stateProvider => {
    $stateProvider.state('partner', {
        url: '/partner',
        templateUrl: './js/partner/partner.html',
        controller: 'partner',
        resolve: {
            foundPartner: AuthService => AuthService.getLoggedInUser(true)
        }
    })
    .state('partner.editrest', {
      url: '/editrest/{restaurant: json}',
      template: '<add-rest submitcall="submitcall" restaurant="restaurant"></add-rest>',
      resolve: {
            foundPartner: AuthService => AuthService.getLoggedInUser(true)
        },
      controller: ($scope, $stateParams, $state, RestaurantFact) => {
        $scope.restaurant = $stateParams.restaurant;
        $scope.submitcall = toUpdate => {
          RestaurantFact.update(toUpdate)
          .then(updatedRst => $state.go('partner'))
          .catch(error => console.error(error));
        };
      }
    })
    .state('partner.newrest', {
      url: '/newrest',
      template: '<add-rest submitcall="submitcall" restaurant="restaurant"></add-rest>',
      resolve: {
            foundPartner: AuthService => AuthService.getLoggedInUser(true)
        },
      controller: ($scope, RestaurantFact, $state, foundPartner) => {
        $scope.restaurant = {};
        $scope.restaurant.seating = [{size: 0, quantity: 0}];
        $scope.submitcall = toUpdate => {
          toUpdate.contact = foundPartner._id;
          RestaurantFact.createOne(toUpdate)
          .then(updatedPrtner => $state.go('partner'))
          .catch(error => console.error(error));
        };
      }
    })
    .state('partner.editrez', {
      url: '/editrez/{restaurant: json}',
      template: '<edit-rez events="events" config="config" restaurant="restaurant"></edit-rez>',
      resolve: {
          calendarInfo: (CalendarFact, $stateParams) => CalendarFact.populateCalendar($stateParams.restaurant)
        },
      controller: ($scope, CalendarFact, calendarInfo, $stateParams) => {
        $scope.events = calendarInfo.events;
        $scope.config = calendarInfo.config; 
        $scope.restaurant = $stateParams.restaurant;
      }
    })
    .state('partner.analyzerest', {
      url: '/analyzerest/{restaurant: json}',
      template: '<lin-reg data="data" options="options"></lin-reg>',
      resolve: {
            foundPartner: AuthService => AuthService.getLoggedInUser(true),
            chartData: (ChartFact, $stateParams) => ChartFact.getChart($stateParams.restaurant),
            regression: (RestaurantFact, $stateParams) => {
              return RestaurantFact.getAnalytics($stateParams.restaurant._id)
              .then(analytics => analytics)
              .catch(err => console.error(err));
            }
        },
      controller: ($scope, chartData, regression) => {
        console.log(regression);
        $scope.options = chartData.options;
        $scope.data = chartData.data;
      }
    });
})
.controller('partner', ($scope, $state, foundPartner) => {
    $scope.restaurants = foundPartner.restaurants;
    $scope.sendDeal = ($event) => {
        
        console.log($event);
    };
    $scope.sendNotification = ($event) => {
        
        console.log($event);
    };
   
}); 