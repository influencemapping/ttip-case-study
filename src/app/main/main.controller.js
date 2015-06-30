'use strict';

angular.module('ttipCaseStudy')
  .controller('MainCtrl', function ($scope) {
    // use some test data
    // Todo: load all data from file.
    // Todo: do heavy lifting in lib.
    $scope.nodeData =
      {
        "persons": [
            {
              "memberships": [
                {
                  "organization_id": "european-commission-directorate-general-for-trade",
                  "person_id": "benjamin-musall",
                  "role": "Assistant Policy Officer - Policy Co-ordinator for Market Access, Industry, Energy and Raw Materials",
                  "id": "8592fdc72f864657b995ef854866d8c4"
                },
                {
                  "organization_id": "ceramie-unie",
                  "person_id": "benjamin-musall",
                  "role": "Director for Trade Policy",
                  "id": "a3b57861911343aeb5d793c3aaaa3ea9"
                }
              ],
              "id": "benjamin-musall",
              "name": "Benjamin Musall"
            },
            {
              "memberships": [
                {
                  "organization_id": "european-commission-directorate-general-for-trade",
                  "person_id": "paolo-garzotti",
                  "role": "Head of Unit, WTO Coordination, OECD, Export Credits and Dual Use Items",
                  "id": "398850f419d3424594547e245b4e81b4"
                }
              ],
              "id": "paolo-garzotti",
              "name": "Paolo Garzotti"
            }
        ],
        "organizations": [
            {
              "id": "european-commission-directorate-general-for-competition",
              "name": "European Commission, Directorate-General for Competition"
            },
            {
              "id": "us-department-of-labor",
              "name": "US Department of Labor"
            }
        ]
    };

    angular.forEach($scope.nodes, function(node) {
      console.log(node)
      //awesomeThing.rank = Math.random();
    });
  }).directive("nodeGraph", function($window) {
    return{
      restrict: "EA",
      template: "<svg width='850' height='200'></svg>",
      link: function(scope, elem, attrs){
        //graph goes here

        var dataToGraph=scope[attrs.graphData];
        //console.log(scope, attrs);
        var padding = 20;
        var pathClass="path";

        var force, gravity;
        var d3 = $window.d3;
        var rawSvg=elem.find('svg');
        var svg = d3.select(rawSvg[0]);

        function setGraphParameters(){

          var force = d3.layout.force()
          .gravity(.05)
          .distance(100)
          .charge(-100);

          force
              .nodes(dataToGraph.persons)
              //.links(dataToGraph.companies)
              .start();

          var link = svg.selectAll(".link")
              .data(dataToGraph.companies)
            .enter().append("line")
              .attr("class", "link");

          var node = svg.selectAll(".node")
              .data(dataToGraph.persons)
            .enter().append("g")
              .attr("class", "node")
              .call(force.drag);

          node.append("image")
              .attr("xlink:href", "https://github.com/favicon.ico")
              .attr("x", -8)
              .attr("y", -8)
              .attr("width", 16)
              .attr("height", 16);

          node.append("text")
              .attr("dx", 12)
              .attr("dy", ".35em")
              .text(function(d) { return d.name });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
        }
  //xScale = d3.scale.linear()
  //.domain([dataToGraph[0].hour, dataToGraph[dataToGraph.length-1].hour])
  //.range([padding + 5, rawSvg.attr("width") - padding]);

   // yScale = d3.scale.linear()
   //     .domain([0, d3.max(q, function (d) {
   //         return d.sales;
   //     })])
   //     .range([rawSvg.attr("height") - padding, 0]);

   // xAxisGen = d3.svg.axis()
   //     .scale(xScale)
   //     .orient("bottom")
   //     .ticks(salesDataToPlot.length - 1);

   // yAxisGen = d3.svg.axis()
   //     .scale(yScale)
   //     .orient("left")
   //     .ticks(5);

   // lineFun = d3.svg.line()
   //     .x(function (d) {
   //         return xScale(d.hour);
   //     })
   //     .y(function (d) {
   //         return yScale(d.sales);
   //     })
   //     .interpolate("basis");


        function drawLineChart() {

           setGraphParameters();

//    svg.append("svg:g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0,180)")
//        .call(xAxisGen);

//    svg.append("svg:g")
//        .attr("class", "y axis")
//        .attr("transform", "translate(20,0)")
//        .call(yAxisGen);

//    svg.append("svg:path")
//        .attr({
//            d: lineFun(salesDataToPlot),
//            "stroke": "blue",
//            "stroke-width": 2,
//            "fill": "none",
//            "class": pathClass
//        });
        }

           drawLineChart();

    }
  };
});
