(function() {
    'use strict';

    angular
        .module('esempioAngularApp')
        .controller('AgiosCaseDialogController', AgiosCaseDialogController);

    AgiosCaseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'AgiosCase'];

    function AgiosCaseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, AgiosCase) {
        var vm = this;

        vm.agiosCase = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.agiosCase.id !== null) {
                AgiosCase.update(vm.agiosCase, onSaveSuccess, onSaveError);
            } else {
                AgiosCase.save(vm.agiosCase, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('esempioAngularApp:agiosCaseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
