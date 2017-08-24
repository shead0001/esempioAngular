(function() {
    'use strict';

    angular
        .module('esempioAngularApp')
        .controller('AgiosCaseDetailController', AgiosCaseDetailController);

    AgiosCaseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AgiosCase'];

    function AgiosCaseDetailController($scope, $rootScope, $stateParams, previousState, entity, AgiosCase) {
        var vm = this;

        vm.agiosCase = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('esempioAngularApp:agiosCaseUpdate', function(event, result) {
            vm.agiosCase = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
