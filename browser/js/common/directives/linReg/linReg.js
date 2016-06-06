'use strict';
app.directive('linReg', () => {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			data: '='
		},
		templateUrl: 'js/common/directives/linReg/linReg.html'
	};
});
