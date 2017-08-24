(function() {
    'use strict';

    angular
        .module('esempioAngularApp')
        .controller('AgiosCaseDeleteController',AgiosCaseDeleteController);

    AgiosCaseDeleteController.$inject = ['$uibModalInstance', 'entity', 'AgiosCase'];

    function AgiosCaseDeleteController($uibModalInstance, entity, AgiosCase) {
        var vm = this;

        vm.agiosCase = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            AgiosCase.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
