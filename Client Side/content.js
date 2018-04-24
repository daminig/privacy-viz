var width = 960 / 2,
    height = 500 / 2,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 55);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select(".graph").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");

d3.csv("data.csv", type, function(error, data) {
  //if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie([{"age": "google.com", "population": "2704659"}, {"age": "facebook.com", "population": "4499890"}, {"age": "youtube.com", "population": "4499890"}]))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });
});

chrome.cookies.getAll({}, function(cookie) {
    console.log(cookie);
});

function type(d) {
  d.population = +d.population;
  return d;
}
