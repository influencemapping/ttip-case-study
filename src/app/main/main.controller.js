'use strict';

angular.module('ttipCaseStudy')
  .controller('MainCtrl', function ($scope) {
    // use some test data
    // Todo: load all data from file.
    $scope.nodes =
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
  });
