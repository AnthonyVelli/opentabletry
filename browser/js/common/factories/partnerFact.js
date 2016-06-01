'use strict';
app.factory('PartnerFact', () => {
	const fact = {};



	let config = {
		scale: "CellDuration",
		cellDuration: 30,
		startDate: new DayPilot.Date.today(),
		days: 1,
		businessBeginsHour: 7,
		businessEndHour: 22,
		resources: [],
		timeHeaders: [
			{ groupBy: "Hour"}
		],
	};

	fact.populateCalendar = (restaurant => {
		for (var tbl in restaurant.seating){
        	config.resources.push({name: 'Table of '+tbl, id: tbl});
    	}
		
		if (!restaurant.reservations.length) {
			return {config: config, events: []}; 
		}
		let events = restaurant.reservations.map(res => {
			return {
				start: new DayPilot.Date(res.start),
				end: new DayPilot.Date(res.end),
				id: res.id,
				resource: res.resource,
				text: res.text
			};
		});
		return {config: config, events: events};

	});
	return fact;
});