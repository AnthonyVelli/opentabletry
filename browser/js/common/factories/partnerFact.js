'use strict';
app.factory('PartnerFact', () => {
	const fact = {};



	let config = {
		viewType: 'Day',
		startDate: new Date().toISOString(),
		days: 1,
		resources: [],
		timeHeaders: [
			{ groupBy: "Day" },
			{ groupBy: "Hour"}
		],
	};

	let events = [
		
	];
	fact.populateCalendar = (restaurant => {
		for (var tbl in restaurant.seating){
        	config.resources.push({name: 'Table of '+tbl, id: tbl});
    	}
		return {config, events};
	});
	return fact;
});