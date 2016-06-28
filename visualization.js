/*******************************************************************************
Author: Venkata Karthik Thota
File: gdpBarGraph.js
See google style guide on JavaScript code sytle if needed.
*******************************************************************************/

// See D3 margin convention: http://bl.ocks.org/mbostock/3019563
var margin = {top: 20, right: 10, bottom: 100, left:50},
    width = 900 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom;

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


/*------------------------------------------------------------------------------
define SVG
Still confused about SVG? see Chapter 3.
The "g" element is used as a container for grouping objects. The SVG will be
in "lightgrey" backgorund to help you visualize it.
See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g for more info
------------------------------------------------------------------------------*/
var svg1 = d3.select("#area1")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");


/* -----------------------------------------------------------------------------
SCALE and AXIS are two different methods of D3. See D3 API Refrence for info on
AXIS and SCALES. See D3 API Refrence to understand the difference between
Ordinal vs Linear scale.
------------------------------------------------------------------------------*/

/* -----------------------------------------------------------------------------
To understand how to import data. See D3 API refrence on CSV. Understand
the difference between .csv, .tsv and .json files. To import a .tsv or
.json file use d3.tsv() or d3.json(), respectively.
------------------------------------------------------------------------------*/
d3.csv("genrecount.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  /*----------------------------------------------------------------------------
  Convert data if necessary. We want to make sure our gdp vaulues are
  represented as integers rather than strings. Use "+" before the variable to
  convert a string represenation of a number to an actual number. Sometimes
  the data will be in number format, but when in doubt use "+" to avoid issues.
  ----------------------------------------------------------------------------*/
  data.forEach(function(d) {
    d.genre = d.genre;
    d.count = +d.count;       // try removing the + and see what the console prints
    console.log(d.count);   // use console.log to confirm
  });

  // sort the gdp values
  data.sort(function(a,b) {
    return b.count - a.count;
  });

  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.genre; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.count; } ) ]);

  svg1.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 400; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.genre); },
      "y": function(d) { return yScale(d.count); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.count); }
    })
    .style("fill", function(d,i) { return 'rgb(255, 0, ' + ((i * 20) + 10) + ')'});


        svg1.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function(d){
                return d.count;
            })
            .attr({
                "x": function(d){ return xScale(d.genre) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.count)+ 12; },
                "font-family": 'helvetica',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("No. of Movies");
});


var svg2 = d3.select("#area2")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");


/* -----------------------------------------------------------------------------
SCALE and AXIS are two different methods of D3. See D3 API Refrence for info on
AXIS and SCALES. See D3 API Refrence to understand the difference between
Ordinal vs Linear scale.
------------------------------------------------------------------------------*/

/* -----------------------------------------------------------------------------
To understand how to import data. See D3 API refrence on CSV. Understand
the difference between .csv, .tsv and .json files. To import a .tsv or
.json file use d3.tsv() or d3.json(), respectively.
------------------------------------------------------------------------------*/
d3.csv("actorcount.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  /*----------------------------------------------------------------------------
  Convert data if necessary. We want to make sure our gdp vaulues are
  represented as integers rather than strings. Use "+" before the variable to
  convert a string represenation of a number to an actual number. Sometimes
  the data will be in number format, but when in doubt use "+" to avoid issues.
  ----------------------------------------------------------------------------*/
  data.forEach(function(d) {
    d.actor = d.actor;
    d.count = +d.count;       // try removing the + and see what the console prints
    console.log(d.count);   // use console.log to confirm
  });

  // sort the gdp values
  data.sort(function(a,b) {
    return b.count - a.count;
  });

  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.actor; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.count; } ) ]);

  svg2.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 400; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.actor); },
      "y": function(d) { return yScale(d.count); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.count); }
    })
    .style("fill", function(d,i) { return 'rgb(255, 0, ' + ((i * 20) + 10) + ')'});


        svg2.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function(d){
                return d.count;
            })
            .attr({
                "x": function(d){ return xScale(d.actor) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.count)+ 12; },
                "font-family": 'helvetica',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("No. of Movies");
});

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis1 = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis1 = d3.svg.axis().scale(y)
    .orient("left");

var div = d3.select("#area3").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
    
// Adds the svg canvas
var svg = d3.select("#area3")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("movierating.csv", function(error, data) {
    data.forEach(function(d) {
        d.id = +d.id;
        d.rating = +d.rating;
    });

    // Scale the range of the data
    x.domain([0, d3.max(data, function(d) { return d.id; })]);
    y.domain([3, d3.max(data, function(d) { return d.rating; })]);

     // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis1);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis1);

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.id); })
        .attr("cy", function(d) { return y(d.rating); })
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.name + "<br/>"  + d.rating)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        })

});
