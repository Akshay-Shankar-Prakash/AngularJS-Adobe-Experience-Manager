;(function() {
    'use strict';

    angular
        .module('dash')
        .controller('EnrolmentBoxController', EnrolmentBoxController);

    function EnrolmentBoxController( $rootScope,
                                         $scope) {
        var vm = this;

        angular.extend(vm, {
            showConfirm: false,
            enrollmentStore: {},
            view: 'landing'
        });

        $scope.goToCard = function() {
            vm.view = 'card';
        }

        $scope.goToLanding = function(){
            vm.view = 'landing'
        }

        $scope.goToBankingProducts = function(){
            vm.view = 'bankingProducts'
        }
      
        init();
        function init()
        {
            $rootScope.$on('dash:enrolment:confirm', function() {
                vm.showConfirm = true;                
            });
            $scope.$on('dash:enrolment:confirm:hide', function() {
                vm.showConfirm = false;                
            });
        }
        
    }
})();


