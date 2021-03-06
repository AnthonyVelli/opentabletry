'use strict';
app.factory('UserFact', ($http => {
	const fact = {};
	fact.createOne = (user => {
		return $http.post('/api/members/', user).then(newUsr => newUsr.data);
	});
	fact.getOne = (userId => {
		return $http.get('/api/members/'+userId).then(newUsr => newUsr.data);
	});
	return fact;
}));