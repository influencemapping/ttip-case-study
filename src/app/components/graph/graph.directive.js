'use strict';

angular.module('ttip.graph')
  .directive('demograph', function(d3, _, dataService, transformService) {
    // constants - todo: pull out into settings
    var margin = 20,
      width = 960,
      height = 500 - 0.5 - margin,
      color = d3.interpolateRgb('#f77', '#77f');

    return{
      restrict: 'E',
      template: '<svg width="850" height="600"></svg>',
      controller: function($scope){
        $scope.graphData = [];

        dataService.getNodes().then(function(data){
          $scope.graphData = transformService.transformFromPopolo(data);
        }, function(error){
          console.log(error);
        });

      },
      scope: {
        graphData: '=' // watch for changes in data
      },
      link: function(scope, element, attrs){

        // todo: there must be a better way in angular to use d3

        var rawSvg= element.find('svg');
        var svg = d3.select(rawSvg[0])
          .append('svg')
          .attr('width', width)
          .attr('height', height + margin + 100);

        // watch for changes
        scope.$watch('graphData', function (newValue, oldValue) {

          // clear the elements inside of the directive
          svg.selectAll('*').remove();

          // if 'val' is undefined, exit
          if (!newValue) {
            return;
          }

          var data = newValue;

        //var padding = 20;
        //var pathClass='path';

        //var force, gravity;


        function drawGraph(){

          var force = d3.layout.force()
          .size([850, 200])
          .gravity(0.05)
          .distance(100)
          .charge(-100);

          force
            .nodes(data.nodes)
            .links(data.links)
            .start();

          // var link = svg.selectAll('.link')
          //   .data(data.links)
          //   .enter().append('line')
          //   .attr('class', 'link');

          // var node = svg.selectAll('.node')
          //   .data(data.nodes)
          //   .enter().append('g')
          //   .attr('class', 'node')
          //   .call(force.drag);

          // node.append('image')
          //   .attr('xlink:href', 'https://source.opennews.org/static/base/img/favicon.ico')
          //   .attr('x', -8)
          //   .attr('y', -8)
          //   .attr('width', 16)
          //   .attr('height', 16);

          // node.append('text')
          //   .attr('dx', 12)
          //   .attr('dy', '.35em')
          //   .text(function(d) { return d.name; });

          // force.on('tick', function() {
          //   link.attr('x1', function(d) { return d.source.x; })
          //       .attr('y1', function(d) { return d.source.y; })
          //       .attr('x2', function(d) { return d.target.x; })
          //       .attr('y2', function(d) { return d.target.y; });

          //   node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
          // });
        }

        drawGraph();
      });
    }
  };
});
