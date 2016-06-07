'use strict';
app.directive('addRest', () => {
  return {
    restrict: 'E',
    scope: {
      restaurant: '=',
      submitcall: '&'
    },
    templateUrl: 'js/common/directives/addRestaurant/addRest.html',
    link: (scope => {
      console.log(scope.restaurant);
      scope.states = 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ').map(state => ({abbrev: state}));
  
      let origRest = angular.copy(scope.restaurant);
      scope.reset = () => {
        scope.restaurant = origRest;
        scope.userForm.$setPristine();
      };
      scope.addTable = () => scope.restaurant.seating.push({size: 0, quantity: 0});

      scope.submitForm = () => {
        scope.submitcall()(scope.restaurant);
      };
    })
  };
});
