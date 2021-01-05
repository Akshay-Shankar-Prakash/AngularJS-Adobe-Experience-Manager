;
(function () {
    'use strict';
    angular
        .module('dash')
        .controller('glbLabelController', glbLabelController)

    function glbLabelController($rootScope,
                                $scope,
                                $location,
                                queryParameterService) {
            
        var vm = this;

        angular.extend(vm, {
            
            showLabel:true
        });

        $scope.getConfigSettings = function (qParamLabel, qParamCheckbox) {

            vm.qParamLabel = qParamLabel;
            vm.qParamCheckbox = qParamCheckbox;

            init();
        }

        function init() {

            $scope.$on('$locationChangeSuccess', function (event) {

                if (vm.qParamLabel != '' || vm.qParamCheckbox != '') {
                    var showErrorMessage = queryParameterService.checkForQueryParam('rc',vm.qParamLabel);

                    if (showErrorMessage) {
                        vm.showLabel = true;
                    } else {
                        vm.showLabel = false;
                    }
                }
            });
        }
    }
})();