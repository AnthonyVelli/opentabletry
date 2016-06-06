'use strict';
app.factory('ChartFact', () => {
	const fact = {};
	let options = {
		chart: {
			type: 'lineChart',
			height: 450,
			margin : {
				top: 20,
				right: 20,
				bottom: 40,
				left: 55
			},
			x: function(d){ return d.x; },
			y: function(d){ return d.y; },
			useInteractiveGuideline: true,
			dispatch: {
				stateChange: function(e){ console.log("stateChange"); },
				changeState: function(e){ console.log("changeState"); },
				tooltipShow: function(e){ console.log("tooltipShow"); },
				tooltipHide: function(e){ console.log("tooltipHide"); }
			},
			xAxis: {
				axisLabel: 'Day',
				tickFormat: (d) => d3.time.format('%b %d')(new Date(d))
			},
			yAxis: {
				axisLabel: 'Capacity',
				tickFormat: function(d){
					return d3.format('.02f')(d);
				},
				axisLabelDistance: -10
			},
			callback: function(chart){
				console.log("!!! lineChart callback !!!");
			}
		},
		title: {
			enable: true,
			text: 'Title for Line Chart'
		},
	};

	function restData(history) {
		let restCapacity = [];
		let restCustomers = [];
		for (let day in history) {
			let date = new Date(day);
			let customers = 0;
			let capacity = 0;
			history[day].forEach(tbl => {
				customers += tbl.occupied * tbl.size;
				capacity += tbl.quantity * tbl.size;
			});
			restCapacity.push({x: date, y: capacity});
			restCustomers.push({x: date, y: customers});
		}
		return [{
			values: restCustomers,
			key: 'Seats Occupied',
			color: '#ff7f0e'
		},{
			values: restCapacity,
			key: 'Total Seats',
			color: '#2ca02c',
			area: true
		}];
	}

	fact.getChart = restaurant => {
		return {options: options, data: restData(restaurant.history)};
	};

	return fact;
});