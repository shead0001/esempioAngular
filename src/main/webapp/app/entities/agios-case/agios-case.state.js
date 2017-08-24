(function() {
    'use strict';

    angular
        .module('esempioAngularApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('agios-case', {
            parent: 'entity',
            url: '/agios-case',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'AgiosCases'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/agios-case/agios-cases.html',
                    controller: 'AgiosCaseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('agios-case-detail', {
            parent: 'agios-case',
            url: '/agios-case/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'AgiosCase'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/agios-case/agios-case-detail.html',
                    controller: 'AgiosCaseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'AgiosCase', function($stateParams, AgiosCase) {
                    return AgiosCase.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'agios-case',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('agios-case-detail.edit', {
            parent: 'agios-case-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agios-case/agios-case-dialog.html',
                    controller: 'AgiosCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AgiosCase', function(AgiosCase) {
                            return AgiosCase.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('agios-case.new', {
            parent: 'agios-case',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agios-case/agios-case-dialog.html',
                    controller: 'AgiosCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                caseNr: null,
                                caseNo: null,
                                personNr: null,
                                companyNr: null,
                                agiosNodeName: null,
                                workflowUid: null,
                                reasons: null,
                                statusUid: null,
                                currentStepUid: null,
                                codeName: null,
                                evtOpen: null,
                                displayName: null,
                                evtclose: null,
                                agiosEntity: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('agios-case', null, { reload: 'agios-case' });
                }, function() {
                    $state.go('agios-case');
                });
            }]
        })
        .state('agios-case.edit', {
            parent: 'agios-case',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agios-case/agios-case-dialog.html',
                    controller: 'AgiosCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AgiosCase', function(AgiosCase) {
                            return AgiosCase.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('agios-case', null, { reload: 'agios-case' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('agios-case.delete', {
            parent: 'agios-case',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/agios-case/agios-case-delete-dialog.html',
                    controller: 'AgiosCaseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AgiosCase', function(AgiosCase) {
                            return AgiosCase.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('agios-case', null, { reload: 'agios-case' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
