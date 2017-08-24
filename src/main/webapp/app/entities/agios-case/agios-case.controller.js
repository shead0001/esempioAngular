(function() {
    'use strict';

    angular
        .module('esempioAngularApp')
        .controller('AgiosCaseController', AgiosCaseController);

    AgiosCaseController.$inject = ['AgiosCase'];

    function AgiosCaseController(AgiosCase) {

        var vm = this;

        vm.agiosCases = [];

        loadAll();

        function loadAll() {
            AgiosCase.query(function(result) {
                vm.agiosCases = result;
                vm.searchQuery = null;
            });
        }
    }
})();
