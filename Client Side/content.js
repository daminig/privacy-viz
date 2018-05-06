// Adapted from https://bl.ocks.org/mbostock/3887193

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
    .value(function(d) { return d.visits; });

var svg = d3.select(".graph").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");

d3.csv("data.csv", type, function(error, data) {
  //if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie([{'site': 'https://docs.google.com/', 'visits': 16}, {'site': 'https://www.google.com/', 'visits': 14}, {'site': 'https://github.com/', 'visits': 8}, {'site': 'https://ieorpicnicgroup.slack.com/', 'visits': 5}, {'site': 'https://scholar.google.com/', 'visits': 5}]))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.site); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("x", -50)
      .text(function(d) { return d.data.site; });
});

chrome.cookies.getAll({}, function(cookie) {
    console.log(cookie);
});

function type(d) {
  d.visits = +d.visits;
  return d;
}

document.addEventListener("DOMContentLoaded", function() {
  // Go to premium page
  var button = document.getElementById("premium");
  button.addEventListener("click", function() {
    chrome.tabs.create({url: chrome.extension.getURL("graph.html")});
  })
  // Delete all cookies
  var buttonTwo = document.getElementById("delete");
  buttonTwo.addEventListener("click", function() {
    chrome.cookies.getAll({}, function(cookie) {
      for (c in cookie) {
        chrome.cookies.remove({"url": "https://" + cookie[c]["domain"] + cookie[c]["path"], "name": cookie[c]["name"]});
      }
    });
  })
});

// Get all cookie and history data from the browser

var totalData = {"history": [], "cookies": []};

// chrome.history.search({text: ''}, function(data) {
//     data.forEach(function(page) {
//       totalData.history.push({"id": page.id,
//         "url": page.url,
//         "title": page.title,
//         "lastVisitTime": page.lastVisitTime,
//         "visitCount": page.visitCount,
//         "typedCount": page.typedCount
//       });
//     });
//     chrome.cookies.getAll({}, function(cookie) {
//       totalData.cookies = cookie;
      
//       chrome.runtime.sendMessage(totalData, function(response) {
//         var http = new XMLHttpRequest();
//         http.open("POST", "http://localhost:8000/interface.php", true);
//         http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         var conv = new String(response);
//         http.send(JSON.stringify(totalData));

//         console.log(http.responseText);
//       });
//     });

//     console.log(totalData);
// });
