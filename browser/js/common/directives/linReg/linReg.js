'use strict';
app.directive('linReg', () => {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			data: '=',
      prediction: '='
		},
		templateUrl: 'js/common/directives/linReg/linReg.html'
	};
});
