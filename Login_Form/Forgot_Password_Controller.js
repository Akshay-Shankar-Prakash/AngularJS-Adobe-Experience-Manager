;(function() {
  'use strict';

  angular
    .module('dash')
    .controller('ForgotPasswordController', ForgotPasswordController);

  function ForgotPasswordController($rootScope,
                                  $scope,
                                  $sce,
                                  $timeout,                 
                                  RedirectService,
                                  RecoverPasswordService,
                                  RememberMeStore,
                                  CaptchaService,
                                  $q) {
    var buttonShakeTimer;
    var vm = this;

    angular.extend(vm, {
      input: {
        username: '',
        email: ''              
      },
      buttonLoading: false,
      usernameFieldError: false,
      showLengthError: false,
      showValidationError: false,      
      showSubmitError: false, 
      submitError: '',
      submitErrori18n: '',
      emailSent: false,
      buttonShake: false,
      showLoadingOverlay: 'on',
      onBlurUsername: onBlurUsername,
      clearErrors: clearErrors,
      cancel: cancel,
      onBlurEmail: onBlurEmail,
      onChangeEmail: onChangeEmail,
      submit: submit        
    });    

    $scope.$on('destroy', function()
    {
      $timeout.cancel(buttonShakeTimer);
    });    
      
    geti18nData();
         
    function geti18nData() {
      vm.showLoadingOverlay = 'off';
      vm.submitErrori18n = Granite.I18n.get('LGN-FORGOT-PASSWORD0022');  
    }
    
    function clearErrors()
    {
      vm.usernameFieldError = false;
      vm.showLengthError = false;
      vm.showValidationError = false;
      vm.usernameRequired = false;
    }    

    function onBlurUsername(eventType) 
    {
      if(vm.form.registration.username.$dirty || eventType=='submit') {   
        if(vm.input.username == undefined || vm.input.username == ''){
          vm.usernameFieldError = true;
          vm.usernameRequired = true;
          return false;
        } else if(vm.input.username.length < 6){
          vm.usernameFieldError = true;
          vm.showLengthError = true;
          return false;
        } 
      }  

      return true;   
    }      
    
    function onBlurEmail(eventType){
      if(vm.form.registration.email.$dirty || eventType=='submit'){
        if(!vm.input.email || vm.input.email.length === 0){
          vm.isInputEmailError = true;
          vm.isInputEmailRequired = true;
          return false;
        } else if(!_isEmail(vm.input.email)){
          vm.isInputEmailError = true;
          vm.isInvalidInputEmailFormat = true;
          return false;
        } else {
          return true;
        }
        return true;      
      }
      console.log("onblurEmail -- Forgot Pass");
    }

    function onChangeEmail(){
      vm.isInputEmailError = false;
      vm.isInputEmailRequired = false;
      vm.isInvalidInputEmailFormat = false;
      console.log("onChangeEmail -- Forgot Pass");
    }

    function _isEmail(email) {
      var pattern = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
      return  pattern.test(email) ? true : false;
    }
      
    function cancel() 
    {
        vm.input.username = '';
        RedirectService.redirect('login.html');
    }

    function _shakeButton()
    {    
      vm.buttonShake = true;
      buttonShakeTimer = $timeout(function(){
        vm.buttonShake = false;
      }, 0);
    }
      
    function recoverPassword(){
      //  remeber id
      RememberMeStore.set({email: vm.input.username});
      var dataPosted = {
          username: vm.input.username,
          emailAddress: vm.input.email
      };

        CaptchaService.ready
        .then(function() {return CaptchaService.getToken('FogotPassword', dataPosted)})
        .then(function(dataPosted) {
          $q.when(RecoverPasswordService.recoverPassword(dataPosted))
            .then(function(response){
                console.log(response);
                vm.response = 'email';                   
            })
            .catch(function(error){
                console.log(error);

                var errorMsg = vm.submitErrori18n + " ";
                if(error.data.statusCode){
                    if (error.data.statusCode === '40100') {
                      vm.response = '401';
                    } else if (error.data.statusCode === '40400') {
                      vm.response = '404';
                    } else {
                      errorMsg += error.statusText;
                    }
                } else {
                    errorMsg += error.status;
                }

                vm.submitError = errorMsg;
                vm.usernameFieldError = true;
                vm.isInputEmailError = true;
                vm.showSubmitError = true;
            })
            .finally(function() {
              vm.buttonLoading = false;
              RememberMeStore.clear();
            });
        })
    }

    function submit($event) 
    {
      vm.usernameFieldError = false;
      vm.showSubmitError = false;
      var invalidUsername = !vm.onBlurUsername('submit');
      var invalidEmail =  !vm.onBlurEmail('submit');
      if ( !vm.response )
      {
          if ( invalidUsername || invalidEmail )
          {
            //emit event to focus first invalid
            $scope.$emit('dash:public-page-form-submit:focusFirstInvalid');              
              _shakeButton();
              return false;
          }
                      
          // submit
          vm.buttonLoading = true;
          recoverPassword();
          //..vm.emailSent = true;    
      }
        else
        {
            RedirectService.redirect('login.html');
        }
        
      
    }    

    
    
    
  }
}());