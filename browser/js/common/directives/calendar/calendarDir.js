'use strict';
app.directive('editRez', (CalendarFact, RestaurantFact) => {
  return {
    restrict: 'E',
    scope: {
      restaurant: '=',
      events: '=',
      config: '='
    },
    templateUrl: 'js/common/directives/calendar/calendarDir.html',
    link: (scope => {

      scope.dp.onEventClicked = e => {
        console.log(e.e.data);
        scope.event = e.e.data;
        scope.selected = true;
        scope.$apply();
      };

      scope.dp.onTimeRangeSelected = e => {
        if (scope.event) {
          scope.deleteEvent(scope.event);
        }
        scope.dp.clearSelection();
        scope.event = {
          start: new DayPilot.Date(e.start.value, true),
          end: new DayPilot.Date(e.end.value, true),
          id: DayPilot.guid(),
          resource: e.resource
        };
        scope.events.push(scope.event);
        scope.selected = true;
        scope.$apply();
      };

      scope.deleteEvent = (id) => {
        let deleteIDX = scope.events.findIndex(event => event.id = id);
        scope.events.splice(deleteIDX, 1);
        scope.restaurant.reservations = scope.events;
        RestaurantFact.update(scope.restaurant)
          .then(updatedRest => {
            scope.selected = false;
            scope.event = null; })
          .catch(error => console.error(error));
      };

      scope.submitForm = () => {
        scope.event = null;
        scope.restaurant.reservations = scope.dp.events.list;
        console.log(scope.restaurant);
        RestaurantFact.update(scope.restaurant)
          .then(updatedRest => {
            scope.selected = false; 
            scope.event = null; })
          .catch(error => console.error(error));
      };
    })
  };
});

