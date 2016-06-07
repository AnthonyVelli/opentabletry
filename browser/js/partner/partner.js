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
      url: '/editrest/:restaurant',
      template: '<add-rest submitcall="submitcall" restaurant="restaurant"></add-rest>',
      resolve: {
        restaurant: (RestaurantFact, $stateParams) => {
          console.log('resolving again');
          return RestaurantFact.getOne($stateParams.restaurant)
          .then(rest => rest)
          .catch(err => console.error(err));
        }
      },
      controller: ($scope, $stateParams, $state, restaurant, RestaurantFact) => {
        $scope.restaurant = restaurant;
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
      url: '/editrez/:restaurant',
      template: '<edit-rez events="events" config="config" restaurant="restaurant"></edit-rez>',
      resolve: {
        restaurant: (RestaurantFact, $stateParams) => {
          return RestaurantFact.getOne($stateParams.restaurant)
          .then(rest => rest)
          .catch(err => console.error(err));
        },
          calendarInfo: (CalendarFact, restaurant) => CalendarFact.populateCalendar(restaurant)
        },
      controller: ($scope, calendarInfo, restaurant) => {
        $scope.events = calendarInfo.events;
        $scope.config = calendarInfo.config; 
        $scope.restaurant = restaurant;
      }
    })
    .state('partner.analyzerest', {
      url: '/analyzerest/:restaurant',
      template: '<lin-reg prediction="regression" data="data" options="options"></lin-reg>',
      resolve: {
            regression: (RestaurantFact, $stateParams) => {
              return RestaurantFact.getAnalytics($stateParams.restaurant)
              .then(analytics => analytics)
              .catch(err => console.error(err));
            },
            chartData: (ChartFact, regression) => ChartFact.getChart(regression[2])
        },
      controller: ($scope, chartData, regression) => {
        regression[0] = Math.round(regression[0][0]);
        $scope.regression = regression;
        $scope.data = chartData.data;
        $scope.options = chartData.options;
      }
    });
})
.controller('partner', ($scope, $state, foundPartner) => {
    $scope.restaurants = foundPartner.restaurants.map(rest => {
      return {name: rest.name, _id: rest._id};
    });
    $scope.sendDeal = ($event) => {
        
        console.log($event);
    };
    $scope.sendNotification = ($event) => {
        
        console.log($event);
    };
   
}); 