'use strict';
app.factory('RestaurantFact', ($http => {
	const fact = {};
	fact.getOne = (id => $http.get('/api/restaurants/'+id).then(rest => rest.data));
	fact.createOne = (rest => {
		return $http.post('/api/restaurants/', rest).then(rest => rest.data);
	});
	fact.update = (rest => {
		return $http.put('/api/restaurants/', rest).then(rest => rest.data);
	});
	fact.getYelp = (() => {
		return $http.get('/search').then(rest => rest.data);
	});
	return fact;
}));