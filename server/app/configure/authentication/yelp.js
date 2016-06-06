'use strict';
const Yelp = require('yelp');
const geoip = require('geoip-lite');

module.exports = app => {
	const yelp = new Yelp(app.getValue('env').YELP);
	app.get('/search', (req, res, next) => {
		let yelpQuery = {};
		if (!req.clientIp.location) {
			yelpQuery.location ='Jersey City';
		} else {
			let location = geoip.lookup(req.clientIp);
			yelpQuery =  {term: 'restaurants', sort: 1, location: location.city, cll: location.ll.join(', ')};
		}
		yelp.search(yelpQuery)
			.then(searchHits => res.json(searchHits))
			.catch(next);
	});
};