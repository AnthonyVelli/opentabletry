'use strict';
app.factory('RestaurantFact', ($http => {
	const fact = {};
	fact.getOne = id => $http.get('/api/restaurants/'+id).then(rest => rest.data);
	fact.createOne = rest => $http.post('/api/restaurants/', rest).then(rest => rest.data);
	fact.update = rest => $http.put('/api/restaurants/', rest).then(rest => rest.data);
	fact.getYelp = () => $http.get('/search').then(rest => rest.data);
	return fact;
}));