(function() {
    'use strict';

    angular
        .module('dash')
        .constant('PROGRESS_BAR_STEP', {
            1: 'progress-bar--step-1',
            2: 'progress-bar--step-2',
            3: 'progress-bar--step-3',
            4: 'progress-bar--step-4'
        })
        .controller('ProgressBarController', ProgressBarController);

    function ProgressBarController($rootScope,
                                   PROGRESS_BAR_STEP,
                                   DetectMobileOSService) {
        var vm = this;

        angular.extend(vm, {
            setProgressBarStep: PROGRESS_BAR_STEP[1],
            step: 1,
            visible: true,
            isMobileOS: DetectMobileOSService.getMobileOperatingSystem()
        });

        listenerEvent();

        function listenerEvent() {
            $rootScope.$on('dash:show_progress-bar_step_2', function() {
                vm.step = 2;
                vm.setProgressBarStep = PROGRESS_BAR_STEP[2];
                setFocus();                
            });

            $rootScope.$on('dash:show_progress-bar_step_3', function() {
                vm.step = 3;
                vm.setProgressBarStep = PROGRESS_BAR_STEP[3];
                setFocus();
            });

            $rootScope.$on('dash:show_progress-bar_step_4', function() {
                vm.step = 4;
                vm.setProgressBarStep = PROGRESS_BAR_STEP[4];
                setFocus();
            });
          
            $rootScope.$on('dash:hide_progress-bar', function(){
                vm.visible = false;
                setFocus();
            });
        }

        function setFocus() {
            angular.element(document.querySelector("#hiddenFocusedInput")).focus(); 
            if(vm.isMobileOS == 'iOS'){
                document.querySelector("#hiddenFocusedInput").scrollIntoView();
            }
        }
    }
})();
