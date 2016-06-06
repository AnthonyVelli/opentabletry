'use strict';
app.factory('CalendarFact', () => {
	const fact = {};



	let config = {
		scale: "CellDuration",
    cellDuration: 30,
    days: 5,
		startDate: new DayPilot.Date.today(),
		businessStartsHour: 7,
    businessEndsHour: 22,
    businessWeekends: true,
    showNonBusiness: false,
		resources: [],
    treeAutoExpand: false,
    treeEnabled: true,
		timeHeaders: [
      { groupBy: "Day"},
			{ groupBy: "Hour", format: 'hh:mm tt'}
		],
	};

	fact.populateCalendar = (restaurant => {
    config.resources = restaurant.seating.map(tbls => {
        let resource = {name: 'Tables of '+tbls.size.toString(), dynamicChildren: true, id: tbls.size.toString(), expanded: true, children: []};
        for (var x = 0; x < tbls.quantity; x++) {
          resource.children.push({name: tbls.size.toString()+'.'+(x+1).toString(), id: tbls.size.toString()+'.'+(x+1)});
        }
        return resource;
    });
		
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