(function() {
    'use strict';
    angular
        .module('esempioAngularApp')
        .factory('AgiosCase', AgiosCase);

    AgiosCase.$inject = ['$resource'];

    function AgiosCase ($resource) {
        var resourceUrl =  'api/agios-cases/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
