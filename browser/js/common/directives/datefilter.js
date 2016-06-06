'use strict';
app.directive('dayPilotConversion', () => {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attr, ngModel) => {
      function PilotToDate (date) {
        if (!date) {return null; }
        return new Date(date.toDateLocal());
      }

      function DateToPilot(date) {
        if (!date) {return null; }
        return new DayPilot.Date(date, true);
      }
      ngModel.$parsers.push(DateToPilot);
      ngModel.$formatters.push(PilotToDate);
    }
  };
});