
var width = 500;
var height = 500;
var randPositions;

var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);

var player = svg.selectAll('.playa').data([[333,250]]);

player.enter().append('circle')
    .attr("class", "playa")
    .attr("r", 5)
    .attr("cx", function(d){return d[0];})
    .attr("cy", function(d){return d[1];});

svg.on('mousemove',function(){
  var a = d3.mouse(this);
  player.attr("cx", function(d) { return a[0]; })
        .attr("cy", function(d) { return a[1]; });
});

var update = function(data){

  var enemies = svg.selectAll('.enemy')
    .data(data);

  enemies.transition()
          .duration(750)
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; });

  enemies.enter().append("circle")
        .attr("class", "enemy")
        .attr("r", 10)
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; });
};

setInterval(function(){
  randPositions = _.range(0,20).map(function(item){
    return [Math.random()*width, Math.random()*height];
  });
  update(randPositions);
}, 1000);