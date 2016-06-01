'use strict';
app.directive('addRest', function () {

    return {
        restrict: 'E',
        scope: {
            signup: '=',
            seating: '='
        },
        templateUrl: 'js/common/directives/addRestaurant/addRest.html'
    };

});
