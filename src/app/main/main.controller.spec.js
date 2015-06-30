'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('ttipCaseStudy'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should have two people', inject(function($controller) {
    expect(scope.nodes).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(angular.isArray(scope.notes)).toBeTruthy();
    //expect(scope.nodes.length == 2).toBeTruthy();
  }));
});
