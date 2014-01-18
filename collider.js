
var width = 500;
var height = 500;
var randPositions;

var svg = d3.select('body').append('svg')
			.attr('width', width)
			.attr('height', height);

var updater = function(data){

	var enemies = svg.selectAll('circle')
		.data(data);

	enemies.transition()
      	  .duration(750)
	      .attr("cx", function(d) { return d[0]; })
	      .attr("cy", function(d) { return d[1]; });

	enemies.enter().append("circle")
	      .attr("class", "enemy")
	      .attr("r", 5)
	      .attr("cx", function(d) { return d[0]; })
	      .attr("cy", function(d) { return d[1]; });
};

setInterval(function(){
	randPositions = _.range(0,20).map(function(item){
		return [Math.random()*width, Math.random()*height];
	});
	updater(randPositions);
}, 1000);