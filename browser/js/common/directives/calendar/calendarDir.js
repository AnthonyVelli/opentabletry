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
      scope.dp = new DayPilot.Scheduler("dp");
      _.assign(scope.dp, scope.config);
      scope.dp.events.list = scope.events;
      scope.dp.init();

      scope.dp.onEventClicked = e => {
        scope.event = e.e.data;
        scope.selected = true;
        scope.dp.update();
        scope.$apply();
      };

      scope.dp.onTimeRangeSelected = e => {
        if (scope.event) {
          scope.deleteEvent(scope.event);
        }
        scope.event = new DayPilot.Event({
          start: new DayPilot.Date(e.start.value, true),
          end: new DayPilot.Date(e.end.value, true),
          id: DayPilot.guid(),
          resource: e.resource
        });
        scope.dp.events.add(event);
        scope.selected = true;
        scope.dp.update();
        scope.$apply();
      };

      scope.deleteEvent = (id) => {
        scope.dp.events.remove(scope.dp.events.find(id));
        scope.selected = false;
      };

      scope.submitForm = () => {
        scope.event = null;
        scope.restaurant.reservations = scope.dp.events.list;
        RestaurantFact.update(scope.restaurant)
          .then(updatedRest => {
            scope.dp.update();
            console.log(updatedRest);
            scope.event = {};
            scope.selected = false; })
          .catch(error => console.error(error));
      };
    })
  };
});

