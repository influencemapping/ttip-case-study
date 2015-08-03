'use strict';

angular.module('ttip.graph').
    controller('graphController', function($scope, dataService) {
    $scope.nodelist = [];

    $scope.nodeList = dataService.getNodes();



    console.log($scope.nodeList)
});
