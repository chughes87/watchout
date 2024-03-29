
var width = 700;
var height = 700;
var randPositions;
var eRadius = 10;
var pRadius = 10;
var currentScore = 0;
var highScore = 0;

var scores = d3.select('.scores');

var high = scores.append('div')
        .attr('class', 'highScore')
        .text("High Score: " + highScore);

var current = scores.append('div')
        .attr('class', 'currentScore')
        .text("Current Score: " + currentScore);

var svg = d3.select('.board').append('svg')
      .attr('width', width)
      .attr('height', height);

var player = svg.selectAll('.playa').data([[333,250]]);

player.enter().append('circle')
    .attr("class", "playa")
    .attr("r", pRadius)
    .attr("cx", function(d){return d[0];})
    .attr("cy", function(d){return d[1];});

svg.on('mousemove',function(){  
  var a = d3.mouse(this);
  player.attr("cx", function(d) { return a[0]; })
        .attr("cy", function(d) { return a[1]; });
});

var updateScore = function(){
  high.text("High Score: " + highScore);
  current.text("Current Score: " + currentScore);
};

var collidedCallback = function(){
  if(currentScore > highScore){
    highScore = currentScore;
  }
  currentScore = 0;
  updateScore();
};

setInterval(function(){currentScore++; updateScore();},100);

var collisionDetection = function(){
  return function(t){
    // var a = arguments;
    // debugger;
    var enemy = d3.select(this);
    var player = d3.select('.playa');
    var radiusSum, separation, xDiff, yDiff;
    radiusSum = eRadius + pRadius;
    xDiff = parseFloat(enemy.attr('cx')) - parseFloat(player.attr('cx'));
    yDiff = parseFloat(enemy.attr('cy')) - parseFloat(player.attr('cy'));
     // debugger;
    separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    // console.log(separation);
    if (separation < radiusSum) collidedCallback(player, enemy);
  };
};

var update = function(data){

  var enemies = svg.selectAll('.enemy')
    .data(data);

  enemies.transition()
          .duration(750)
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; })
        .tween('custom', collisionDetection);

  enemies.enter().append("circle")
        .attr("class", "enemy")
        .attr("r", eRadius)
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; });
};

setInterval(function(){
  randPositions = _.range(0,20).map(function(item){
    return [Math.random()*width, Math.random()*height];
  });
  update(randPositions);
}, 1000);