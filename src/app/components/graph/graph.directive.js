'use strict';

angular.module('ttip.graph')
  .directive('demograph', function($window, dataService) {
    console.log('link directive');

    return{
      restrict: 'E',
      template: '<svg width="850" height="200"></svg>',
      controller: function($scope){
        $scope.graphData = [];
        $scope.graphData = dataService.getNodes();
        $scope.graphData = {'nodes':[{'name':'Myriel','group':1},{'name':'Napoleon','group':1},{'name':'Mlle.Baptistine','group':1},{'name':'Mme.Magloire','group':1},{'name':'CountessdeLo','group':1},{'name':'Geborand','group':1},{'name':'Champtercier','group':1},{'name':'Cravatte','group':1},{'name':'Count','group':1},{'name':'OldMan','group':1},{'name':'Labarre','group':2},{'name':'Valjean','group':2},{'name':'Marguerite','group':3},{'name':'Mme.deR','group':2},{'name':'Isabeau','group':2},{'name':'Gervais','group':2},{'name':'Tholomyes','group':3},{'name':'Listolier','group':3},{'name':'Fameuil','group':3},{'name':'Blacheville','group':3},{'name':'Favourite','group':3},{'name':'Dahlia','group':3},{'name':'Zephine','group':3},{'name':'Fantine','group':3},{'name':'Mme.Thenardier','group':4},{'name':'Thenardier','group':4},{'name':'Cosette','group':5},{'name':'Javert','group':4},{'name':'Fauchelevent','group':0},{'name':'Bamatabois','group':2},{'name':'Perpetue','group':3},{'name':'Simplice','group':2},{'name':'Scaufflaire','group':2},{'name':'Woman1','group':2},{'name':'Judge','group':2},{'name':'Champmathieu','group':2},{'name':'Brevet','group':2},{'name':'Chenildieu','group':2},{'name':'Cochepaille','group':2},{'name':'Pontmercy','group':4},{'name':'Boulatruelle','group':6},{'name':'Eponine','group':4},{'name':'Anzelma','group':4},{'name':'Woman2','group':5},{'name':'MotherInnocent','group':0},{'name':'Gribier','group':0},{'name':'Jondrette','group':7},{'name':'Mme.Burgon','group':7},{'name':'Gavroche','group':8},{'name':'Gillenormand','group':5},{'name':'Magnon','group':5},{'name':'Mlle.Gillenormand','group':5},{'name':'Mme.Pontmercy','group':5},{'name':'Mlle.Vaubois','group':5},{'name':'Lt.Gillenormand','group':5},{'name':'Marius','group':8},{'name':'BaronessT','group':5},{'name':'Mabeuf','group':8},{'name':'Enjolras','group':8},{'name':'Combeferre','group':8},{'name':'Prouvaire','group':8},{'name':'Feuilly','group':8},{'name':'Courfeyrac','group':8},{'name':'Bahorel','group':8},{'name':'Bossuet','group':8},{'name':'Joly','group':8},{'name':'Grantaire','group':8},{'name':'MotherPlutarch','group':9},{'name':'Gueulemer','group':4},{'name':'Babet','group':4},{'name':'Claquesous','group':4},{'name':'Montparnasse','group':4},{'name':'Toussaint','group':5},{'name':'Child1','group':10},{'name':'Child2','group':10},{'name':'Brujon','group':4},{'name':'Mme.Hucheloup','group':8}],'links':[{'source':1,'target':0,'value':1},{'source':2,'target':0,'value':8},{'source':3,'target':0,'value':10},{'source':3,'target':2,'value':6},{'source':4,'target':0,'value':1},{'source':5,'target':0,'value':1}]}

      },
      link: function(scope, elem, attrs){
        // graph goes here
console.log(scope,attrs)
        var dataToGraph=scope[attrs.graphData];
        //console.log(scope, attrs);
        //var padding = 20;
        //var pathClass='path';

        //var force, gravity;
        var d3 = $window.d3;
        var rawSvg=elem.find('svg');
        var svg = d3.select(rawSvg[0]);

        function setGraphParameters(){

          var force = d3.layout.force()
          .size([850, 200])
          .gravity(0.05)
          .distance(100)
          .charge(-100);

          force
            .nodes(dataToGraph.nodes)
            .links(dataToGraph.links)
            .start();

          var link = svg.selectAll('.link')
            .data(dataToGraph.links)
            .enter().append('line')
            .attr('class', 'link');

          var node = svg.selectAll('.node')
            .data(dataToGraph.nodes)
            .enter().append('g')
            .attr('class', 'node')
            .call(force.drag);

          node.append('image')
            .attr('xlink:href', 'https://source.opennews.org/static/base/img/favicon.ico')
            .attr('x', -8)
            .attr('y', -8)
            .attr('width', 16)
            .attr('height', 16);

          node.append('text')
            .attr('dx', 12)
            .attr('dy', '.35em')
            .text(function(d) { return d.name; });

          force.on('tick', function() {
            link.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });

            node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
          });
        }

        function drawGraph() {
// console.log('draw')
            setGraphParameters();
        }

         drawGraph();

    }
  };
});
