'use strict';
app.factory('ChartFact', () => {
	const fact = {};
	
	function getOptions(data) {
		let options = {
			chart: {
				type: 'linePlusBarChart',
				height: 450,
				margin : {
					top: 20,
					right: 50,
					bottom: 40,
					left: 55
				},
				x: function(d,i) { return i; },
				xAxis: {
					axisLabel: 'Day',
					tickFormat: function(d) {
						var dx = data[0].values[d] && data[0].values[d].x || 0;
						if (dx > 0) {
							return d3.time.format('%x')(new Date(dx))
						}
						return null;
					}
				},
				x2Axis: {
					tickFormat: function(d) {
						var dx = data[0].values[d] && data[0].values[d].x || 0;
						return d3.time.format('%b-%Y')(new Date(dx))
					},
					showMaxMin: false
				},
				y1Axis: {
					axisLabel: 'Seats Occupied',
					tickFormat: function(d){
						return d3.format(',f')(d);
					},
					axisLabelDistance: 12
				},
				y2Axis: {
					axisLabel: 'Temperature',
					tickFormat: function(d) {
						return d3.format(',f')(d);
					}
				},
				y3Axis: {
					tickFormat: function(d){
						return d3.format(',f')(d);
					}
				},
				y4Axis: {
					tickFormat: function(d) {
						return '$' + d3.format(',.2f')(d)
					}
				},
				bars: {forceY: [0]}, 
			},
			title: {
				enable: true,
				text: 'Temperature/Seats Occupied Regression'
			},
		};
		return options;
	}
	function restObvs(observations) {
		var restTemps = [];
		observations.forEach(observation => {
			let dateString = Object.keys(observation)[0].toString();
			restTemps.push({x: dateString, y: observation[dateString][3]});
		});
		return {
			values: restTemps,
			key: 'Temperature',
			color: 'blue'
		};
	}

	function restData(history) {
		let restCapacity = [];
		let restCustomers = [];
		for (let day in history) {
			let date = day;
			let customers = 0;
			let capacity = 0;
			history[day].forEach(tbl => {
				customers += tbl.occupied * tbl.size;
				capacity += tbl.quantity * tbl.size;
			});
			restCapacity.push({x: date, y: capacity});
			restCustomers.push({x: date, y: customers});
		}
		return {
			values: restCustomers,
			key: 'Seats Occupied',
			bar: true,
			color: '#ff7f0e'
		};
	}

	fact.getChart = (restaurant) => {
		let data = [restData(restaurant.history)];
		let observations = restObvs(restaurant.observations);
		data.push(observations);
		let options = getOptions(data);
		return {options: options, data: data};
	};



	return fact;
});