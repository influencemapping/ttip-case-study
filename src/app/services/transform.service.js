'use strict';

angular.module('ttip.services').
  factory('transformService', function(_) {

  var extractNodes = function (nodes) {

    var mapNodes = function (ls, key) {
      return _.map(ls, function (l) {
        return _.extend(l, { 'type': key });
      });
    }

    return _.union(_.flatten(_.map(nodes, mapNodes)));
  };


  var extractLinks = function (memberships) {
    return _.map(memberships, function (m) {
      return { 'source_id': m.person_id,
        'target_id': m.organization_id,
        'role': m.role,
        'id': m.id
      };
    });
  };

  var linker = function (nodes, links) {
    var getNodeId = function (id) {
      return _.findIndex(nodes, function (n) {
        return n.id === id;
      });
    };

    return _.each(links, function (l) {
      l.source = getNodeId(l.source_id);
      l.target = getNodeId(l.target_id);
    });
  };


  function transform( data ){
    var nodes = extractNodes(data);
    var memberships = _.union(_.flatten(_.map(data.persons,
      function (p) { return _.values(_.pick( p, 'memberships')); }
    )));
    var links = linker (nodes, extractLinks(_.union(memberships)));
console.log(extractLinks(_.union(memberships)))
    var transformed = {'nodes': nodes, 'links': links};

    return transformed;
  }

  return({
    transformFromPopolo: transform,
    // for testing only
    linker: linker,
    extractLinks: extractLinks,
    extractNodes: extractNodes
  });
});
