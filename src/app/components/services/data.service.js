'use strict';

angular.module('ttip.services').
  service('dataService', function($http, $q) {

    function getNodes() {
        var request = $http({
            method: 'get',
            url: 'data/ttip_popolo_en.json'
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function addNodes(  ) {
        var request = $http({
            method: 'post',
            url: ''
            // params: {
            //     action: 'add'
            // },
            // data: {
            //     name: name
            // }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function removeNode( id ) {
        var request = $http({
            method: 'delete',
            url: '',
            // params: {
            //     action: 'delete'
            // },
            data: {
                id: id
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function handleError( response ) {
        // Normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( 'An unknown error occurred.' ) );
        }
        // Expected error message.
        return( $q.reject( response.data.message ) );
    }

    function handleSuccess( response ) {
        return( response.data );
    }

    return({
        addNodes: addNodes,
        getNodes: getNodes,
        removeNode: removeNode
    });
});
